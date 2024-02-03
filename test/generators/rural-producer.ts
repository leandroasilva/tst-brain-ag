import { faker } from '@faker-js/faker/locale/pt_BR';
import { generateCnpj } from 'test/helpers';

export function generateRuralProducerGenerator() {
    const totalArea = faker.number.float({ min: 0, max: 100000, precision: 0.01 });
    const vegetationArea = faker.number.float({ min: 0, max: totalArea, precision: 0.01 });
    return {
        name: faker.person.fullName(),
        farm: faker.person.firstName() + ' Farm ',
        city: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
        document: generateCnpj(),
        totalArea: totalArea,
        productiveArea: totalArea - vegetationArea,
        vegetationArea: vegetationArea
  };
}
