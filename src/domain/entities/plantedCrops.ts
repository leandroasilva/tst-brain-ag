import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { BaseStructureEntity } from "./BaseStructureEntity";
import { RuralProducer } from "./ruralProducer.entity";

@Entity({ name: 'planted_crops' })
export class PlantedCrops extends BaseStructureEntity {
  @Column({ name: 'name', nullable: false, length: 180 })
  name: string;

  @Column({ name: 'rural_producer_id', nullable: false, length: 180 })
  ruralProducerId: string;

  @ManyToOne(() => RuralProducer)
  @JoinColumn({ name: 'tenant_id' })
  ruralProducer: RuralProducer;
}
