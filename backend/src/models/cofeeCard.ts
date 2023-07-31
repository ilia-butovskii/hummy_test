import mongoose from 'mongoose';
import { v4 } from 'uuid';

import { ICoffeeCardDocument } from './types/coffeeCard';

export const CoffeeCardSchema = new mongoose.Schema<ICoffeeCardDocument>(
  {
    uid: {
      type: String,
      default: v4,
      required: true,
      unique: true,
    },
    blendName: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    variety: {
      type: String,
      required: true,
    },
    notes: {
      type: [String],
      required: true,
      default: [],
    },
    intensifier: {
      type: String,
      required: true,
    },
    _coffeeImage: {
      type: mongoose.Types.ObjectId,
      ref: 'coffeeImage',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
