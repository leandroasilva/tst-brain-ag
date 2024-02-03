import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantedCrops } from 'src/domain/entities/plantedCrops';
import { RuralProducer } from 'src/domain/entities/ruralProducer.entity';

import { RuralProducerRepository } from './rural-producer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RuralProducer, PlantedCrops])],
  providers: [RuralProducerRepository],
  exports: [RuralProducerRepository],
})
export class RuralProducerRepositoryModule {}
