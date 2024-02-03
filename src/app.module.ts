import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RuralProducerModule } from './app/rural-producer/rural-producer.module';
import typeorm from './infra/database/typeorm';
import { DateModule } from './infra/providers/date/date.module';
import { UtilsModule } from './infra/providers/utils/utils.module';
import { PlantedCropsRepositoryModule } from './infra/repositories/planted-crops/planted-crops.module';
import { RuralProducerRepositoryModule } from './infra/repositories/rural-producer/rural-producer.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    UtilsModule,
    DateModule,
    RuralProducerRepositoryModule,
    RuralProducerModule,
    PlantedCropsRepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) { 
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
