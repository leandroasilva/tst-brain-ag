import { Module } from '@nestjs/common';
import { UtilsModule } from 'src/infra/providers/utils/utils.module';
import { RuralProducerRepositoryModule } from 'src/infra/repositories/rural-producer/rural-producer.module';

import { RuralProducerController } from './rural-producer.controller';
import { RuralProducerService } from './rural-producer.service';
import { PlantedCropsRepositoryModule } from 'src/infra/repositories/planted-crops/planted-crops.module';

@Module({
  imports: [
    RuralProducerRepositoryModule,
    PlantedCropsRepositoryModule,
    UtilsModule,
  ],
  providers: [RuralProducerService],
  controllers: [RuralProducerController],
})
export class RuralProducerModule {}
