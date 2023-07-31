import mongoose, { Document } from 'mongoose';

import { ICoffeeImageDocument } from './coffeeImage';

export interface ICoffeeCardDocument extends Document, ICoffeeCardData {}

export interface ICoffeeCardData {
  uid: string;
  blendName: string;
  origin: string;
  variety: string;
  notes: string[];
  intensifier: string;
  _coffeeImage: mongoose.Types.ObjectId | ICoffeeImageDocument;
}

export interface ICoffeeCardModel extends mongoose.Model<ICoffeeCardDocument> {}
