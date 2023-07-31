import { MiddlewareConsumer, Module } from '@nestjs/common';

import { CoffeeCardsHttpModule } from './coffeeCards/CoffeeCardsHttpModule';
import { CoffeeImagesHttpModule } from './coffeeImages/CoffeeImagesHttpModule';
import { AccessLogMiddleware } from '../middlewares/AccessLogMiddleware';
import { LogModule } from '../modules/log/LogModule';

@Module({
  imports: [CoffeeCardsHttpModule, CoffeeImagesHttpModule, LogModule],
})
export class HttpModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AccessLogMiddleware).forRoutes('*');
  }
}
