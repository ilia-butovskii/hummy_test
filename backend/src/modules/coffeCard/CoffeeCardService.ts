import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { InjectModel } from '../../decorators/injectModel';
import { ESchemaName } from '../../models/schemasMap';
import { ICoffeeCardDocument, ICoffeeCardModel } from '../../models/types/coffeeCard';
import { ICoffeeImageModel } from '../../models/types/coffeeImage';
import { ICardPayload } from './types';

@Injectable()
export class CoffeeCardService {
  constructor(
    @InjectModel(ESchemaName.CoffeeCard)
    private readonly CoffeeCard: ICoffeeCardModel,
    @InjectModel(ESchemaName.CoffeeImage)
    private readonly CoffeeImage: ICoffeeImageModel
  ) {}

  async createCard(payload: ICardPayload): Promise<ICoffeeCardDocument> {
    const image = await this.CoffeeImage.create({ src: payload.image });

    const payloadWithoutImage = _.omit(payload, ['image']);

    return this.CoffeeCard.create({
      ...payloadWithoutImage,
      _coffeeImage: image._id,
    });
  }
}
