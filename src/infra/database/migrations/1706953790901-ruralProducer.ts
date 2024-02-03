import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class RuralProducer1706953790901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: 'rural_producers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '180',
            isNullable: true,
          },
          {
            name: 'farm',
            type: 'varchar',
            length: '180',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '150',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            length: '2',
            isNullable: true,
          },
          {
            name: 'document',
            type: 'varchar',
            length: '14',
            isNullable: false,
          },
          {
            name: 'total_area',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: true,
            default: '0.00',
          },
          {
            name: 'productive_area',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: true,
            default: '0.00',
          },
          {
            name: 'vegetation_area',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: true,
            default: '0.00',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rural_producers');
  }
}
