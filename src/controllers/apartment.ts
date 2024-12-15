import { Request, Response } from 'express';
import Apartment from '../models/apartment';

const createApartment = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const newApartment = new Apartment({
      name,
    });

    await newApartment.save();

    res.status(201).json({
      message: 'Квартира додана!',
      apartment: newApartment,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: 'Помилка при додаванні квартири', error: err.message });
    } else {
      res.status(500).json({ message: 'Невідома помилка при додаванні квартири' });
    }
  }
};

export { createApartment };

