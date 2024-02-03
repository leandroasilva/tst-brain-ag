import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRuralProducerDto } from 'src/domain/dtos/rural-producer.dto';
import { RuralProducer } from 'src/domain/entities/ruralProducer.entity';
import { Brackets, EntityManager, Repository } from 'typeorm';

@Injectable()
export class RuralProducerRepository {
  constructor(
    @InjectRepository(RuralProducer)
    private readonly ruralProducerRepository: Repository<RuralProducer>,
  ) {}

  findRuralProducerByDocument(
    document: string,
    manager?: EntityManager,
  ): Promise<RuralProducer> {
    const repository = this.getRuralProducerRepository(manager);
    return repository.findOne({
      where: { document },
    });
  }

  findRuralProducerById(
    id: string,
    manager?: EntityManager,
  ): Promise<RuralProducer> {
    const repository = this.getRuralProducerRepository(manager);
    return repository.findOne({
      where: { id },
    });
  }

  createRuralProducer(
    payload: Partial<RuralProducer>,
    manager?: EntityManager,
  ) {
    const repository = this.getRuralProducerRepository(manager);
    const newRuralProducer = repository.create(payload);
    return repository.save(newRuralProducer);
  }

  updateRuralProducer(
    id: string,
    payload: Partial<RuralProducer>,
    manager?: EntityManager,
  ) {
    const repository = this.getRuralProducerRepository(manager);
    return repository.update(id, payload);
  }

  deleteRuralProducer(id: string, manager?: EntityManager) {
    const repository = this.getRuralProducerRepository(manager);
    return repository.softDelete(id);
  }

  findAllRuralProducer(query: QueryRuralProducerDto, manager?: EntityManager) {
    const repository = this.getRuralProducerRepository(manager);
    const take = query.size ? +query.size : 3;
    const skip = query.page ? query.page * take : 0;
    const keyword = query.query || '';

    const repo = repository
      .createQueryBuilder('rural_producers')
      .select([
        'rural_producers.id',
        'rural_producers.created_at',
        'rural_producers.updated_at',
        'rural_producers.name',
        'rural_producers.farm',
        'rural_producers.city',
        'rural_producers.state',
        'rural_producers.document',
        'rural_producers.total_area',
        'rural_producers.productive_area',
        'rural_producers.vegetation_area',
      ])
      .where(
        new Brackets((b) => {
          b.where('rural_producers.name like :keyword').orWhere(
            'rural_producers.document like :keyword',
          );
        }),
      )
      .setParameters({ keyword: `%${keyword}%` });

    return repo.skip(skip).take(take).getManyAndCount();
  }

  private getRuralProducerRepository(manager?: EntityManager) {
    return (
      manager?.getRepository(RuralProducer) ?? this.ruralProducerRepository
    );
  }
}
