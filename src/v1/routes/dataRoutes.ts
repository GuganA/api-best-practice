import { Router } from 'express';
import {
  getAlldatas,
  getOnedata,
  createNewdata,
  updateOnedata,
  deleteOnedata,
} from '../../controllers';
import { authenticate } from '../../middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/stories:
 *   get:
 *     summary: Get all stories
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of stories
 */
router.get('/', authenticate, getAlldatas);

/**
 * @swagger
 * /api/v1/stories/{dataId}:
 *   get:
 *     summary: Get a single story by ID
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dataId
 *         required: true
 *         schema:
 *           type: string
 *         description: Story ID
 *     responses:
 *       200:
 *         description: Story found
 *       404:
 *         description: Story not found
 */
router.get('/:dataId', authenticate, getOnedata);

/**
 * @swagger
 * /api/v1/stories:
 *   post:
 *     summary: Create a new story
 *     tags: [Stories]
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
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: My first story
 *               content:
 *                 type: string
 *                 example: Once upon a time...
 *               isPublic:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Story created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', authenticate, createNewdata);

/**
 * @swagger
 * /api/v1/stories/{dataId}:
 *   put:
 *     summary: Update a story by ID
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dataId
 *         required: true
 *         schema:
 *           type: string
 *         description: Story ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated title
 *               content:
 *                 type: string
 *                 example: Updated content
 *               isPublic:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Story updated successfully
 *       404:
 *         description: Story not found
 */
router.put('/:dataId', authenticate, updateOnedata);

/**
 * @swagger
 * /api/v1/stories/{dataId}:
 *   delete:
 *     summary: Delete a story by ID
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dataId
 *         required: true
 *         schema:
 *           type: string
 *         description: Story ID
 *     responses:
 *       200:
 *         description: Story deleted successfully
 *       404:
 *         description: Story not found
 */
router.delete('/:dataId', authenticate, deleteOnedata);

export { router };