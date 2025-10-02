const Task = require('../models/taskModel');

const getTasks = async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.page) || 1;
    try {
       const count = await Task.countDocuments({ user: req.user._id });

        const tasks = await Task.find({ user: req.user._id })
        .limit(pageSize) 
        .skip(pageSize * (page - 1)); 
        res.status(200).json({
        tasks,
        page,
        pages: Math.ceil(count / pageSize),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ message: 'Please add a title and a due date' });
  }

  try {
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      user: req.user._id,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task && task.user.equals(req.user._id)) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Task not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;
  try {
    const task = await Task.findById(req.params.id);

    if (task && task.user.equals(req.user._id)) {
      task.title = title || task.title;
      task.description = description || task.description;
      task.dueDate = dueDate || task.dueDate;
      task.priority = priority || task.priority;
      task.status = status || task.status;

      const updatedTask = await task.save();
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task && task.user.equals(req.user._id)) {
      await task.deleteOne();
      res.status(200).json({ message: 'Task removed' });
    } else {
      res.status(404).json({ message: 'Task not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};