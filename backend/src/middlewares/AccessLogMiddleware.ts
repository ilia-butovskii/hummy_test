import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { LogService } from '../modules/log/LogService';

@Injectable()
export class AccessLogMiddleware implements NestMiddleware {
  constructor(private readonly logService: LogService) {}

  use(req: Request, res: Response, next: NextFunction): any {
    let isResponseSent = false;

    const requestTime = new Date();

    const log = async () => {
      const responseTime = new Date();

      await this.logService.accessLog({
        requestTime,
        responseTime,
        req,
        res,
      });
    };

    res.on('finish', async () => {
      isResponseSent = true;

      await log();
    });

    res.on('close', async () => {
      if (!isResponseSent) {
        await log();
      }
    });

    return next();
  }
}
