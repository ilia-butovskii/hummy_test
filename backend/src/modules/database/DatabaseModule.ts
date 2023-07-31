import { DynamicModule, Module } from '@nestjs/common';
import { modelsProviders } from './ModelsProvider';
import { DatabaseService } from './DatabaseService';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [DatabaseService, ...modelsProviders],
      exports: [DatabaseService, ...modelsProviders],
      global: true,
    };
  }
}
