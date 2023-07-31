import { Injectable } from '@nestjs/common';

import { InjectModel } from '../../decorators/injectModel';
import { ESchemaName } from '../../models/schemasMap';
import { IAccessLogData, IAccessLogModel } from '../../models/types/accessLog';
import { IAccessLogPayload } from './types';

@Injectable()
export class LogService {
  constructor(
    @InjectModel(ESchemaName.AccessLog)
    private readonly AccessLog: IAccessLogModel
  ) {}

  async accessLog(payload: IAccessLogPayload): Promise<void> {
    const { requestTime, responseTime, res, req } = payload;

    const accessLogData: IAccessLogData = {
      dateTime: responseTime,
      responseTime: responseTime.getTime() - requestTime.getTime(),
      ip: req.header('x-forwarded-for') || req.socket.remoteAddress,
      path: req.path,
      userAgent: req.header('user-agent'),
      responseStatus: res.statusCode,
      method: req.method,
    };

    await this.AccessLog.create(accessLogData);
  }
}
