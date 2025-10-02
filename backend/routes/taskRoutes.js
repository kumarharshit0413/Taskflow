const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const taskValidationRules = [
  body('title', 'Title is required').not().isEmpty(),
  body('dueDate', 'Due date is required').not().isEmpty(),
  body('dueDate', 'Please provide a valid date').isISO8601().toDate(),
];

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: Task management for authenticated users
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for the logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       '200':
 *         description: A list of tasks with pagination info
 *       '401':
 *         description: Not authorized
 */
router.get('/', protect, getTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *                 description: Task title
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Due date for the task
 *               priority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *     responses:
 *       '201':
 *         description: Task created successfully
 *       '400':
 *         description: Invalid task data
 *       '401':
 *         description: Not authorized
 */
router.post('/', protect, taskValidationRules, createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a single task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       '200':
 *         description: The task data
 *       '401':
 *         description: Not authorized
 *       '404':
 *         description: Task not found
 */
router.get('/:id', protect, getTaskById);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Task title
 *               dueDate:
 *                 type: string
 *                 format: date
 *               priority:
 *                 type: string
 *                 enum: [High, Medium, Low]
 *               status:
 *                 type: string
 *                 enum: [pending, completed]
 *     responses:
 *       '200':
 *         description: Task updated successfully
 *       '401':
 *         description: Not authorized
 *       '404':
 *         description: Task not found
 */
router.put('/:id', protect, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       '200':
 *         description: Task removed
 *       '401':
 *         description: Not authorized
 *       '404':
 *         description: Task not found
 */
router.delete('/:id', protect, deleteTask);

module.exports = router;
