import { Module } from '@nestjs/common';

import { CoffeeImagesController } from './CoffeeImagesController';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [CoffeeImagesController],
})
export class CoffeeImagesHttpModule {}
