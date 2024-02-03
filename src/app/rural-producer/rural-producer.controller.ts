import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { RequestPlatedCropsDto } from 'src/domain/dtos/planted-crops.dto';
import { RequestQueryRuralProducerDto, RequestRuralProducerDto } from 'src/domain/dtos/rural-producer.dto';

import { RuralProducerService } from './rural-producer.service';

@Controller('v1/rural-producers')
export class RuralProducerController {
  constructor(private readonly ruralProducerService: RuralProducerService) {}

  @Post()
  async create(@Body() payload: RequestRuralProducerDto) {
    return this.ruralProducerService.createRuralProducer(payload);
  }

  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: string,
    @Body() payload: RequestRuralProducerDto,
  ) {
    return this.ruralProducerService.updateRuralProducer(id, payload);
  }

  @Get()
  async findAll(@Query() query: RequestQueryRuralProducerDto) {
    return this.ruralProducerService.findAllRuralProducers(query);
  }

  @Get(':id')
  async findById(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: string,
  ) {
    return this.ruralProducerService.findRuralProducerById(id);
  }

  @Delete(':id')
  async delete(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: string,
  ) {
    return this.ruralProducerService.deleteRuralProducer(id);
  }

  @Post(':id/planted-crops')
  async plantedCrops(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: string,
    @Body() payload: RequestPlatedCropsDto,
  ) {
    return this.ruralProducerService.createPlantedCrops(id, payload);
  }

  @Delete(':id/planted-crops/:plantedCropId')
  async deletePlantedCrops(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: string,
    @Param(
      'plantedCropId',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    plantedCropId: string,
  ) {
    return this.ruralProducerService.deletePlantedCrops(id, plantedCropId);
  }

  @Get(':id/planted-crops')
  async findAllPlantedCrops(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    ruralProducerId: string,
  ) {
    return this.ruralProducerService.findAllPlantedCrops(ruralProducerId);
  }
}
