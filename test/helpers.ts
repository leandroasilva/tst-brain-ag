import { faker } from '@faker-js/faker/locale/pt_BR';
import { addDays } from 'date-fns';

function calculateCheckerDigit(
  digits: string,
  firstCheckerPounds: number[],
  secondCheckerPounds: number[],
): string {
  let firstCheckerDigitSum = 0;
  let secondCheckerDigitSum = 0;

  for (const [index, digit] of digits.split('').entries()) {
    firstCheckerDigitSum += parseInt(digit, 10) * firstCheckerPounds[index];
    secondCheckerDigitSum += parseInt(digit, 10) * secondCheckerPounds[index];
  }

  firstCheckerDigitSum %= 11;

  const firstCheckerDigit =
    firstCheckerDigitSum < 2 ? 0 : 11 - firstCheckerDigitSum;

  secondCheckerDigitSum +=
    firstCheckerDigit * secondCheckerPounds[secondCheckerPounds.length - 1];

  secondCheckerDigitSum %= 11;

  const secondCheckerDigit =
    secondCheckerDigitSum < 2 ? 0 : 11 - secondCheckerDigitSum;

  return `${digits}${firstCheckerDigit}${secondCheckerDigit}`;
}

export function generateCnpj(cleaned = false): string {
  const digits = faker.string.numeric(12);

  const cnpj = calculateCheckerDigit(
    digits,
    [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );

  if (cleaned) {
    return cnpj;
  }

  return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(
    5,
    8,
  )}/${cnpj.substring(8, 12)}-${cnpj.substring(12)}`;
}

export function generateUUID() {
  return faker.string.uuid();
}
