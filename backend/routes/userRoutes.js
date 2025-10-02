const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const generateToken = require('../utils/generateToken');

const registerValidationRules = [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

const loginValidationRules = [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
];

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`http://localhost:5173/oauth/redirect?token=${token}`);
  }
);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication and management
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists or invalid data
 */
router.post('/register', registerValidationRules, registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate a user and get a token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns user info and token
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', loginValidationRules, loginUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all users
 *       401:
 *         description: Not authorized, no token
 *       403:
 *         description: Not authorized as an admin
 */
router.route('/').get(protect, admin, getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User removed
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Not an admin
 *       404:
 *         description: User not found
 */
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
