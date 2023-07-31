import { Module } from '@nestjs/common';

import { LogService } from './LogService';

@Module({
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
