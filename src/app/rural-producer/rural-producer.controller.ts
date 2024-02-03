import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestPlatedCropsDto } from 'src/domain/dtos/planted-crops.dto';
import { RequestQueryRuralProducerDto, RequestRuralProducerDto } from 'src/domain/dtos/rural-producer.dto';

import { RuralProducerService } from './rural-producer.service';

@ApiTags('Rural Producers and Planted Crops')
@Controller('v1/rural-producers')
export class RuralProducerController {
  constructor(private readonly ruralProducerService: RuralProducerService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Rural producer already exists' })
  @ApiResponse({ status: 500, description: 'Unexpected error' })
  async create(@Body() payload: RequestRuralProducerDto) {
    return this.ruralProducerService.createRuralProducer(payload);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Rural producer not found' })
  @ApiResponse({ status: 500, description: 'Unexpected error' })
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
  @ApiResponse({ status: 200, description: 'The record has been successfully listed.' })
  @ApiResponse({ status: 404, description: 'Rural producers not found' })
  @ApiResponse({ status: 500, description: 'Unexpected error' })
  async findAll(@Query() query: RequestQueryRuralProducerDto) {
    return this.ruralProducerService.findAllRuralProducers(query);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The record has been successfully loaded.' })
  @ApiResponse({ status: 404, description: 'Rural producer not found' })
  @ApiResponse({ status: 500, description: 'Unexpected error' })
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
  @ApiResponse({ status: 204, description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Rural producer not found' })
  @ApiResponse({ status: 500, description: 'Unexpected error' })
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
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Rural producer already exists' })
  @ApiResponse({ status: 500, description: 'Unexpected error' })
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
  @ApiResponse({ status: 204, description: 'The record has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Rural producer not found' })
  @ApiResponse({ status: 500, description: 'Unexpected error' })
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
  @ApiResponse({ status: 200, description: 'The record has been successfully loaded.' })
  @ApiResponse({ status: 404, description: 'Rural producer not found' })
  @ApiResponse({ status: 500, description: 'Unexpected error' })
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
