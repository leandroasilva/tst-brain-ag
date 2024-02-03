import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlantedCrops } from 'src/domain/entities/plantedCrops';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PlantedCropsRepository {
  constructor(
    @InjectRepository(PlantedCrops)
    private readonly plantedCropsRepository: Repository<PlantedCrops>,
  ) {}

  findPlantedCropsByName(name: string, manager?: EntityManager) {
    const repository = this.getPlantedCropsRepository(manager);
    return repository
      .createQueryBuilder('planted_crops')
      .where('planted_crops.name = :name', { name })
      .getOne();
  }

  async createPlantedCrops(
    payload: Partial<PlantedCrops>,
    manager?: EntityManager,
  ) {
    const repository = this.getPlantedCropsRepository(manager);
    const newPlantedCrops = repository.create(payload);
    return repository.save(newPlantedCrops);
  }

  findAllPlantedCrops(manager?: EntityManager) {
    const repository = this.getPlantedCropsRepository(manager);
    return repository.find();
  }

  deletePlantedCrops(
    id: string,
    plantedCropId: string,
    manager?: EntityManager,
  ) {
    const repository = this.getPlantedCropsRepository(manager);
    return repository.softDelete({ id: plantedCropId, ruralProducerId: id });
  }

  findPlantedCropsById(id: string, manager?: EntityManager) {
    const repository = this.getPlantedCropsRepository(manager);
    return repository.findOne({ where: { id } });
  }

  findPlantedCropsByRuralProducerId(ruralProducerId: string, manager?: EntityManager) {
    const repository = this.getPlantedCropsRepository(manager);
    return repository
      .createQueryBuilder('planted_crops')
      .where('planted_crops.ruralProducerId = :ruralProducerId', { ruralProducerId })
      .getMany();
  }

  private getPlantedCropsRepository(manager?: EntityManager) {
    return manager?.getRepository(PlantedCrops) ?? this.plantedCropsRepository;
  }
}
