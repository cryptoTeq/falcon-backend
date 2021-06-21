import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './asset.entity';
import { BASE_ENTITY_SATUSES } from '../database/baseEntity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private assetsRepository: Repository<Asset>,
  ) {}

  findActives(): Promise<Asset[]> {
    return this.assetsRepository.find({
      order: { sortOrder: 'ASC' },
      where: { status: BASE_ENTITY_SATUSES.ACTIVE },
    });
  }

  findBySymbol(symbol: string): Promise<Asset> {
    return this.assetsRepository.findOne({
      where: { symbol: symbol.toUpperCase() },
    });
  }
}
