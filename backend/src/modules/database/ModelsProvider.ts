import { ESchemaName } from '../../models/schemasMap';
import { Provider } from '@nestjs/common';
import { DatabaseService } from './DatabaseService';

const appModelPrefix = 'APP_MODEL_';

export function getModelToken(modelName: ESchemaName): string {
  return appModelPrefix + modelName;
}

export const modelsProviders: Provider[] = Object.values(ESchemaName).map((name: ESchemaName) => ({
  provide: getModelToken(name),
  useFactory: (databaseService: DatabaseService) => databaseService.getModel(name),
  inject: [DatabaseService],
}));
