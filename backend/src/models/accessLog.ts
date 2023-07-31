import mongoose from 'mongoose';
import { IAccessLogDocument } from './types/accessLog';

export const AccessLogSchema = new mongoose.Schema<IAccessLogDocument>({
  dateTime: {
    type: Date,
    required: true,
  },
  responseTime: {
    type: Number,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
});
