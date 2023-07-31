import mongoose from 'mongoose';

import { ICoffeeImageDocument } from './types/coffeeImage';

export const CoffeeImageSchema = new mongoose.Schema<ICoffeeImageDocument>(
  {
    src: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
