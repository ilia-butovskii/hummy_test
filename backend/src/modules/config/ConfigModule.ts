import { DynamicModule, Module, Provider } from '@nestjs/common';

import { CONFIG } from './tokens';
import config from '../../config';

const configProvider: Provider = {
  provide: CONFIG,
  useValue: config,
};

@Module({})
export class ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: ConfigModule,
      providers: [configProvider],
      exports: [configProvider],
      global: true,
    };
  }
}
