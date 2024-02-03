import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PlantedCrops1706954318755 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
            name: 'rural_producer_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_c0fcc1f2fa9b46b7ab8fecc64058cf47',
            columnNames: ['rural_producer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'rural_producers',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rural_producers', true, true, true);
  }
}
