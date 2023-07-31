import { Inject } from '@nestjs/common';
import { getModelToken } from '../modules/database/ModelsProvider';
import { ESchemaName } from '../models/schemasMap';

export function InjectModel(token: ESchemaName) {
  return Inject(getModelToken(token));
}
