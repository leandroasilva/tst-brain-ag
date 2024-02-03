import { Injectable } from '@nestjs/common';
import { PlatedCropsDto } from 'src/domain/dtos/planted-crops.dto';
import { QueryRuralProducerDto, RuralProducerDto } from 'src/domain/dtos/rural-producer.dto';
import { ServiceBadRequestError, ServiceNotFoundError } from 'src/domain/errors/services-errors';
import { UtilsProvider } from 'src/infra/providers/utils/utils.provider';
import { PlantedCropsRepository } from 'src/infra/repositories/planted-crops/planted-crops.repository';
import { RuralProducerRepository } from 'src/infra/repositories/rural-producer/rural-producer.repository';

@Injectable()
export class RuralProducerService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
    private readonly plantedCropsRepository: PlantedCropsRepository,
    private readonly utilsProvider: UtilsProvider,
  ) {}

  async createRuralProducer(payload: RuralProducerDto) {
    const exists =
      await this.ruralProducerRepository.findRuralProducerByDocument(
        payload.document,
      );
    if (exists)
      throw new ServiceBadRequestError('Rural producer already exists');

    return this.ruralProducerRepository.createRuralProducer(payload);
  }

  async updateRuralProducer(id: string, payload: RuralProducerDto) {
    const exists = await this.ruralProducerRepository.findRuralProducerById(id);
    if (!exists) throw new ServiceNotFoundError('Rural producer not found');

    return this.ruralProducerRepository.updateRuralProducer(id, payload);
  }

  async findAllRuralProducers(query: QueryRuralProducerDto) {
    let [rows, count] =
      await this.ruralProducerRepository.findAllRuralProducer(query);

    if (!rows) throw new ServiceNotFoundError('Rural producers not found');

    this.utilsProvider.asyncForEach(rows, async (row): Promise<any> => {
      row.document = this.utilsProvider.encryptDocument(row.document);
      row.plantedCrops =
        await this.plantedCropsRepository.findPlantedCropsByRuralProducerId(
          row.id,
        );
      return row;
    });

    return {
      page: query.page,
      size: query.size,
      count,
      rows,
    };
  }

  async findRuralProducerById(id: string) {
    const ruralProducer =
      await this.ruralProducerRepository.findRuralProducerById(id);
    if (!ruralProducer)
      throw new ServiceNotFoundError('Rural producer not found');

    return {
      ...ruralProducer,
      document: this.utilsProvider.encryptDocument(ruralProducer.document),
    };
  }

  async deleteRuralProducer(id: string) {
    const ruralProducer =
      await this.ruralProducerRepository.findRuralProducerById(id);
    if (!ruralProducer)
      throw new ServiceNotFoundError('Rural producer not found');

    return this.ruralProducerRepository.deleteRuralProducer(id);
  }

  async createPlantedCrops(id: string, payload: PlatedCropsDto) {
    const exists = await this.plantedCropsRepository.findPlantedCropsByName(
      payload.name,
    );
    if (exists) throw new ServiceBadRequestError('Planted crop already exists');

    return this.plantedCropsRepository.createPlantedCrops({
      name: payload.name,
      ruralProducerId: id,
    });
  }

  async deletePlantedCrops(id: string, plantedCropId: string) {
    const exists =
      await this.plantedCropsRepository.findPlantedCropsById(plantedCropId);
    if (!exists) throw new ServiceNotFoundError('Planted crop not found');

    return this.plantedCropsRepository.deletePlantedCrops(id, plantedCropId);
  }

  async findAllPlantedCrops(id: string) {
    const plantedCrops =
      await this.plantedCropsRepository.findPlantedCropsByRuralProducerId(id);
    if (!plantedCrops) throw new ServiceNotFoundError('Planted crop not found');

    return plantedCrops;
  }
}
