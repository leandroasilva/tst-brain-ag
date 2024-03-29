import { DataType, newDb } from 'pg-mem';
import { DataSource } from 'typeorm';
import { v4 } from 'uuid';

export default async function setup() {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    implementation: () => 'PostgreSQL 14.0',
    name: 'version',
  });

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  });

  db.registerExtension('uuid-ossp', (schema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: v4,
      impure: true,
    });
  });

  const ds: DataSource = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: ['dist/domanin/entities/*.entity{.ts,.js}'],
  });
  await ds.initialize();
  await ds.synchronize();
};
