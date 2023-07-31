import { Module } from '@nestjs/common';
import { CoffeeCardsController } from './CoffeeCardsController';
import { CoffeeCardModule } from '../../modules/coffeCard/CoffeeCardModule';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CoffeeCardModule, CacheModule.register()],
  controllers: [CoffeeCardsController],
})
export class CoffeeCardsHttpModule {}
