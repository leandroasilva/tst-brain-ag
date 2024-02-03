import { IsEnum, IsNotEmpty } from 'class-validator';

export enum PlantedCrop {
  Soybeans = 'Soja',
  Corn = 'Milho',
  Cotton = 'Algodão',
  Coffee = 'Cafe',
  Sugarcane = 'Cana de Acucar',
}

export class RequestPlatedCropsDto {
  @IsNotEmpty()
  @IsEnum(PlantedCrop)
  name: PlantedCrop;
}

export class PlatedCropsDto {
  name: PlantedCrop;
}
