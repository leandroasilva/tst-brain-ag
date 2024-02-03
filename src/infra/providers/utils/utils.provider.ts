import { isValid as isValidCnpj } from '@fnando/cnpj';
import { isValid as isValidCpf } from '@fnando/cpf';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class UtilsProvider {
  constructor() {}

  async asyncForEach<T>(
    array: T[],
    callback: (item: T, index: number, array: T[]) => Promise<void>,
  ) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  clearSymbols(value: string) {
    return value.replace(/[^\d]/gu, '');
  }

  onlyNumbers(str: string = ''): string {
    return str.replace(/[^0-9]/g, '');
  }

  onlyLetters(str: string): string {
    return str.replace(/[^a-zA-Z]/g, '');
  }

  onlyLettersAndNumbers(str: string): string {
    return str.replace(/[^a-zA-Z0-9]/g, '');
  }

  onlyLettersAndSpaces(str: string): string {
    return str.replace(/[^a-zA-Z ]/g, '');
  }

  onlyLettersAndSpacesAndNumbers(str: string): string {
    return str.replace(/[^a-zA-Z0-9 ]/g, '');
  }

  getMinutesFromSeconds(seconds: number): number {
    return Math.floor(seconds / 60);
  }

  getHoursFromSeconds(seconds: number): number {
    return Math.floor(seconds / 3600);
  }

  getDaysFromSeconds(seconds: number): number {
    return Math.floor(seconds / 86400);
  }

  generateUUID(): string {
    return v4();
  }

  sliceString(args: { value: string; start?: number; end?: number }): string {
    const { value, start = 0, end = value.length } = args;
    return value.slice(start, end);
  }

  isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
  }

  isCpf(value: string): boolean {
    return isValidCpf(value);
  }

  isCnpj(value: string): boolean {
    return isValidCnpj(value);
  }

  static numberHourToString(hour: number, minutes: number): string {
    return `${hour.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  }

  formatFromFloatToReal(value: number) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  static putHourOnDate(date?: string, time?: number): string | undefined {
    if (date) {
      const dateOnly = date.split('T');
      const timeOnly = time ? time.toString().padStart(2, '0') : '00';
      return `${dateOnly[0]}T${timeOnly}:00:00`;
    }
    return undefined;
  }

  public stringifyAll<T>(data: T): string {
    return JSON.stringify(data, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );
  }

  goBackTwoDecimalPlaces(value: number): number {
    return Number((value / 100).toFixed(2));
  }

  getTokenFromHeader(header: { authorization: string }): string {
    const { authorization } = header;

    if (authorization?.includes('Bearer')) {
      return authorization.split(' ')[1];
    }

    return authorization;
  }

  upperCaseFirstLetter(word: string): string {
    return word[0].toUpperCase() + word.toLowerCase().substring(1);
  }

  private encryptCpf(cpf: string): string {
    const cpfWithoutSymbols = this.clearSymbols(cpf);

    return cpfWithoutSymbols.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/u,
      '***.$2.$3-***',
    );
  }

  private encryptCnpj(cnpj: string): string {
    const cnpjWithoutSymbols = this.clearSymbols(cnpj);

    return cnpjWithoutSymbols.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/u,
      '**.$2.$3/*******',
    );
  }

  encryptDocument(document: string): string {
    const documentWithoutSymbols = this.clearSymbols(document);

    if (documentWithoutSymbols.length < 12) {
      return this.encryptCpf(documentWithoutSymbols);
    } else {
      return this.encryptCnpj(documentWithoutSymbols);
    }
  }

  isValidDocument(document: string): boolean {
    const documentWithoutSymbols = this.clearSymbols(document);

    if (documentWithoutSymbols.length < 12) {
      return this.isCpf(documentWithoutSymbols);
    } else {
      return this.isCnpj(documentWithoutSymbols);
    }
  }

  static centsToReal(num: number): number {
    return num / 100;
  }

  centsToReal(num: number): number {
    return UtilsProvider.centsToReal(num);
  }

  centsToBrazilianRealFormatted(value: number): string {
    return this.formatFromFloatToReal(this.centsToReal(value));
  }

  groupArrayByKey<T>(array: Array<T>, key: string): Record<string, T[]> {
    return array.reduce(
      (previous, value) => ({
        ...previous,
        [value[key]]: [...(previous[value[key]] ?? []), value],
      }),
      {},
    );
  }

  calculateArrayKeySum<T>(array: Array<T>, key: string): number {
    let sum = 0;

    if (array) {
      array.forEach((element) => {
        sum += element[key];
      });
    }

    return sum;
  }
}
