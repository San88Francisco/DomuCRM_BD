import { Router } from 'express';
import { createApartment } from '../controllers/apartment';

const router = Router();

/**
 * @swagger
 * /apartments:
 *   post:
 *     summary: Створити нову квартиру
 *     tags: [Apartments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Apartment'
 *     responses:
 *       201:
 *         description: Квартира успішно створена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 apartment:
 *                   $ref: '#/components/schemas/Apartment'
 */
router.post('/', createApartment);

export default router;

