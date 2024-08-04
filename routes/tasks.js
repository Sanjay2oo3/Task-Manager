const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for the logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks
 *       401:
 *         description: Unauthorized
 */
router.get('/', auth, taskController.getTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Add a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully added task
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, taskController.addTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Edit a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully edited task
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', auth, taskController.editTask);

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
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted task
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', auth, taskController.deleteTask);

/**
 * @swagger
 * /api/tasks/{id}/completed:
 *   patch:
 *     summary: Mark a task as completed
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully marked task as completed
 *       401:
 *         description: Unauthorized
 */
router.patch('/:id/completed', auth, taskController.completeTask);

module.exports = router;
