import { Inject, Injectable } from '@nestjs/common';
import mongoose, { Document, Model } from 'mongoose';

import { CONFIG } from '../config/tokens';
import { IConfig } from '../../config';
import { ESchemaName, schemasMap } from '../../models/schemasMap';

@Injectable()
export class DatabaseService {
  private readonly connection: mongoose.Connection;
  private modelsMap: Map<ESchemaName, Model<Document>> = new Map();

  constructor(@Inject(CONFIG) private readonly config: IConfig) {
    this.connection = mongoose.createConnection(config.database.uri);

    this.registerModels();
  }

  public getModel(name: ESchemaName): Model<Document> {
    return this.modelsMap.get(name);
  }

  private registerModels(): void {
    schemasMap.forEach((schema, name) => {
      const model = this.connection.model<Document, Model<Document>>(name, schema);

      this.modelsMap.set(name, model);
    });
  }
}
