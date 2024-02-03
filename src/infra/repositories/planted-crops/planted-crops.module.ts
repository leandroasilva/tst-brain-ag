import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantedCrops } from 'src/domain/entities/plantedCrops';

import { PlantedCropsRepository } from './planted-crops.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlantedCrops])],
  providers: [PlantedCropsRepository],
  exports: [PlantedCropsRepository],
})
export class PlantedCropsRepositoryModule {}
