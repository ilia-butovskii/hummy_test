import { Controller, Get, Inject, Param } from '@nestjs/common';

import { InjectModel } from '../../decorators/injectModel';
import { ESchemaName } from '../../models/schemasMap';
import { ICoffeeImageData, ICoffeeImageModel } from '../../models/types/coffeeImage';
import { plainToInstance } from 'class-transformer';
import { CoffeeImageResponseDto } from './dto/CoffeeImageResponseDto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CONFIG } from '../../modules/config/tokens';
import { IConfig } from '../../config';

@Controller('/coffeeImages')
export class CoffeeImagesController {
  private readonly CACHE_PREFIX = 'coffeeImage';

  constructor(
    @InjectModel(ESchemaName.CoffeeImage)
    private readonly CoffeeImage: ICoffeeImageModel,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject(CONFIG) private readonly config: IConfig
  ) {}

  @Get('/:id')
  async getImageById(@Param('id') id: string): Promise<CoffeeImageResponseDto> {
    const cachedImage = await this.cacheManager.get<CoffeeImageResponseDto>(`${this.CACHE_PREFIX}_${id}`);

    if (cachedImage) {
      return cachedImage;
    }

    const image = await this.CoffeeImage.findById(id).lean<ICoffeeImageData>().exec();
    const formattedImage = plainToInstance(CoffeeImageResponseDto, image, {
      excludeExtraneousValues: true,
    });
    await this.cacheManager.set(`${this.CACHE_PREFIX}_${id}`, formattedImage, this.config.http.cacheTtl);

    return formattedImage;
  }
}
