import mongoose, { Schema, Document } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Apartment:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Назва квартири
 */
export interface IApartment extends Document {
  name: string;
}

const apartmentSchema = new Schema<IApartment>({
  name: { type: String, required: true },
});

const Apartment = mongoose.model<IApartment>('Apartment', apartmentSchema);

export default Apartment;

