import { Document, Model } from 'mongoose';

export interface ICoffeeImageDocument extends Document, ICoffeeImageData {}

export interface ICoffeeImageData {
  src: string;
}

export interface ICoffeeImageModel extends Model<ICoffeeImageDocument> {}
