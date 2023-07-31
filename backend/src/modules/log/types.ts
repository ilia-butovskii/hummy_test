import { Request, Response } from 'express';

export interface IAccessLogPayload {
  requestTime: Date;
  responseTime: Date;
  req: Request;
  res: Response;
}
