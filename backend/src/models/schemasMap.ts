import mongoose from 'mongoose';

import { CoffeeImageSchema } from './coffeeImage';
import { CoffeeCardSchema } from './cofeeCard';
import { AccessLogSchema } from './accessLog';

export enum ESchemaName {
  CoffeeImage = 'CoffeeImage',
  CoffeeCard = 'CoffeeCard',
  AccessLog = 'AccessLog',
}

export const schemasMap = new Map<ESchemaName, mongoose.Schema>([
  [ESchemaName.CoffeeImage, CoffeeImageSchema],
  [ESchemaName.CoffeeCard, CoffeeCardSchema],
  [ESchemaName.AccessLog, AccessLogSchema],
]);
