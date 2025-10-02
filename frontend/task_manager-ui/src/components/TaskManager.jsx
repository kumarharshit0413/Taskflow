import { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import EditTaskModal from './EditTaskModal';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(`/api/tasks?page=${page}`, config);
        setTasks(data.tasks);
        setPages(data.pages);
      } catch (err) {
        setError('Failed to fetch tasks.');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [page]);

  const handleTaskCreated = (newTask) => {
    setTasks([newTask, ...tasks]);
    if (page !== 1) setPage(1);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const pageChangeHandler = (newPage) => {
    if (newPage > 0 && newPage <= pages) setPage(newPage);
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const newPriority = destination.droppableId;
    const updatedTasks = tasks.map(t => (t._id === draggableId ? { ...t, priority: newPriority } : t));
    setTasks(updatedTasks);

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .put(`/api/tasks/${draggableId}`, { priority: newPriority }, config)
      .catch((error) => {
        console.error('Failed to update task priority', error);
        setTasks(tasks);
      });
  };

  if (loading) return <div className="p-4 text-center">Loading tasks...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  const priorityMap = {
    High: tasks.filter(task => task.priority === 'High'),
    Medium: tasks.filter(task => task.priority === 'Medium'),
    Low: tasks.filter(task => task.priority === 'Low'),
  };

  return (
    <div className="font-sans bg-red-300 min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto p-4 pt-8">
        <TaskForm onTaskCreated={handleTaskCreated} />

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(priorityMap).map(([priority, tasksInColumn]) => (
              <Droppable key={priority} droppableId={priority}>
                {(provided, snapshot) => (
                  <motion.div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`rounded-lg p-4 min-h-[200px] shadow-sm transition-colors ${
                      snapshot.isDraggingOver
                        ? 'bg-blue-100'
                        : { High: 'bg-red-100', Medium: 'bg-yellow-50', Low: 'bg-green-100' }[priority]
                    }`}
                  >
                    <h2
                      className={`text-xl font-bold mb-4 border-b-2 pb-2 ${
                        { High: 'text-red-800 border-red-200', Medium: 'text-yellow-800 border-yellow-200', Low: 'text-blue-800 border-blue-200' }[priority]
                      }`}
                    >
                      {priority} Priority
                    </h2>

                    <div className="flex flex-col gap-4 min-h-[150px]">
                      <AnimatePresence>
                        {tasksInColumn.map((task, index) => (
                          <Draggable key={task._id} draggableId={task._id.toString()} index={index}>
                            {(provided, snapshot) => (
                              <TaskItem
                                key={task._id}
                                task={task}
                                onTaskUpdate={handleTaskUpdate}
                                onTaskDelete={handleTaskDelete}
                                onEdit={openModal}
                                provided={provided}
                                snapshot={snapshot}
                              />
                            )}
                          </Draggable>
                        ))}
                      </AnimatePresence>
                      {provided.placeholder}
                    </div>
                  </motion.div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        {pages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <button
              onClick={() => pageChangeHandler(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              Previous
            </button>
            <span className="font-semibold">
              Page {page} of {pages}
            </span>
            <button
              onClick={() => pageChangeHandler(page + 1)}
              disabled={page === pages}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <EditTaskModal isOpen={isModalOpen} onRequestClose={closeModal} task={selectedTask} onTaskUpdate={handleTaskUpdate} />
    </div>
  );
};

export default TaskManager;
