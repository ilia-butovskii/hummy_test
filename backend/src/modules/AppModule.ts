import { Module } from '@nestjs/common';

import { HttpModule } from '../http/HttpModule';
import { DatabaseModule } from './database/DatabaseModule';
import { ConfigModule } from './config/ConfigModule';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule.forRoot(), HttpModule],
  providers: [],
  exports: [],
})
export class AppModule {}
