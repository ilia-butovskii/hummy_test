import { Module } from '@nestjs/common';

import { CoffeeCardService } from './CoffeeCardService';

@Module({
  providers: [CoffeeCardService],
  exports: [CoffeeCardService],
})
export class CoffeeCardModule {}
