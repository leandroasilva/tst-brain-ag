import { Module } from '@nestjs/common';
import { UtilsModule } from 'src/infra/providers/utils/utils.module';
import { RuralProducerRepositoryModule } from 'src/infra/repositories/rural-producer/rural-producer.module';

import { RuralProducerController } from './rural-producer.controller';
import { RuralProducerService } from './rural-producer.service';

@Module({
  imports: [RuralProducerRepositoryModule, UtilsModule],
  providers: [RuralProducerService],
  controllers: [RuralProducerController]
})
export class RuralProducerModule {}
