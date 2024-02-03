import { Column, Entity } from "typeorm";

import { BaseStructureEntity } from "./BaseStructureEntity"
import { PlantedCrops } from "./plantedCrops";

@Entity({ name: 'rural_producers' })
export class RuralProducer extends BaseStructureEntity {
  @Column({ name: 'name', nullable: false, length: 180 })
  name: string;

  @Column({ name: 'farm', nullable: false, length: 180 })
  farm: string;

  @Column({ name: 'city', nullable: true, length: 150 })
  city?: string;

  @Column({ name: 'state', nullable: true, length: 2 })
  state?: string;

  @Column({ name: 'document', nullable: false, length: 14 })
  document: string;
    
  @Column({ name: 'total_area', nullable: true, type: 'decimal', precision: 5, scale: 2 })
  totalArea?: number;
    
  @Column({ name: 'productive_area', nullable: true, type: 'decimal', precision: 5, scale: 2 })
  productiveArea?: number;
    
  @Column({ name: 'vegetation_area', nullable: true, type: 'decimal', precision: 5, scale: 2 })
  vegetationArea?: number;
  
  plantedCrops?: PlantedCrops[];
}