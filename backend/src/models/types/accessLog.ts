import mongoose, { Document } from 'mongoose';

export interface IAccessLogData {
  dateTime: Date;
  responseTime: number;
  path: string;
  ip: string;
  userAgent: string;
  method: string;
  responseStatus?: number;
}

export interface IAccessLogDocument extends IAccessLogData, Document {}

export interface IAccessLogModel extends mongoose.Model<IAccessLogData> {}
