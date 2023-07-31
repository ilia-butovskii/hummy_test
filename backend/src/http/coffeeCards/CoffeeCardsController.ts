import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { InjectModel } from '../../decorators/injectModel';
import { ESchemaName } from '../../models/schemasMap';
import { ICoffeeCardData, ICoffeeCardModel } from '../../models/types/coffeeCard';
import { CoffeeCardResponseDto } from './dto/CoffeeCardResponseDto';
import { CoffeeCardService } from '../../modules/coffeCard/CoffeeCardService';
import { CreateCoffeeCardBodyRequestDto } from './dto/CreateCoffeeCardBodyRequestDto';
import { CONFIG } from '../../modules/config/tokens';
import { IConfig } from '../../config';

@Controller('/coffeeCards')
export class CoffeeCardsController {
  constructor(
    @InjectModel(ESchemaName.CoffeeCard)
    private readonly CoffeeCard: ICoffeeCardModel,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject(CONFIG) private readonly config: IConfig,
    private readonly coffeeCardService: CoffeeCardService
  ) {}

  @Get('/')
  async getAll(): Promise<CoffeeCardResponseDto[]> {
    const cards = await this.CoffeeCard.find().lean<ICoffeeCardData[]>().exec();

    return plainToInstance(CoffeeCardResponseDto, cards, {
      excludeExtraneousValues: true,
    });
  }

  @Get('/last')
  async getLast(): Promise<CoffeeCardResponseDto> {
    const cachedCard = await this.cacheManager.get<CoffeeCardResponseDto>('lastCoffeeCard');

    if (cachedCard) {
      return cachedCard;
    }

    const card = await this.CoffeeCard.findOne().sort({ _id: -1 }).lean<ICoffeeCardData>().exec();

    if (!card) {
      return;
    }

    const formattedCard = plainToInstance(CoffeeCardResponseDto, card, {
      excludeExtraneousValues: true,
    });

    await this.cacheManager.set('lastCoffeeCard', formattedCard, this.config.http.cacheTtl);

    return formattedCard;
  }

  @Post('/')
  async create(@Body() body: CreateCoffeeCardBodyRequestDto): Promise<CoffeeCardResponseDto> {
    const card = await this.coffeeCardService.createCard(body);

    const formattedCard = plainToInstance(CoffeeCardResponseDto, card.toObject<ICoffeeCardData>(), {
      excludeExtraneousValues: true,
    });

    await this.cacheManager.set('lastCoffeeCard', formattedCard, this.config.http.cacheTtl);

    return formattedCard;
  }
}
