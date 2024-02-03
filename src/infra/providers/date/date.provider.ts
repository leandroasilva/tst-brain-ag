import { Injectable } from '@nestjs/common';
import { addDays, addMinutes, differenceInMilliseconds, format, isFuture, isSameDay, secondsToMilliseconds } from 'date-fns';
import { ptBR } from 'date-fns/locale';

@Injectable()
export class DateProvider {
  public format(date: Date, formated: string): string {
    return format(date, formated, { locale: ptBR });
  }

  public getCurrentDate(): Date {
    return new Date();
  }

  public addMinutes(value: Date, minutes: number): Date {
    return addMinutes(value, minutes);
  }

  public addDays(value: Date, days: number): Date {
    return addDays(value, days);
  }

  public getCurrentDatePlusMinutes(minutes: number): Date {
    return this.addMinutes(this.getCurrentDate(), minutes);
  }

  public getCurrentDatePlusDays(days: number): Date {
    return this.addDays(this.getCurrentDate(), days);
  }

  public getDateString(value: Date): string {
    return value.toISOString().substring(0, 10);
  }

  public isDateExpired(value: Date, timeToleranceMinutes?: number) {
    if (timeToleranceMinutes) {
      return (
        this.addMinutes(value, timeToleranceMinutes) <= this.getCurrentDate()
      );
    }

    return value <= this.getCurrentDate();
  }

  public timestampToDate(timestamp: number): Date {
    return new Date(timestamp);
  }

  public dateToTimestamp(date: Date): number {
    return date.getTime();
  }

  public getDate(date?: string): Date {
    if (!date) {
      throw Error('A Date must be provided');
    }

    return new Date(date);
  }

  public getOfxDateFormat(date: Date | string): string {
    return format(new Date(date), "yyyyMMddhhmmss[x:'GMT']");
  }

  public isFuture(date: Date | number): boolean {
    return isFuture(date);
  }

  public secondsToMilliseconds(seconds: number): number {
    return secondsToMilliseconds(seconds);
  }

  public getCurrentPerformanceTime(): number {
    return performance.now();
  }

  public millisecondsToSecondsUnrounded(
    milliseconds: number,
    decimalPlaces: number,
  ): number {
    return Number((milliseconds / 1000).toFixed(decimalPlaces));
  }

  public differenceInMilliseconds(
    endDate: Date | number,
    startDate: Date | number,
  ): number {
    return differenceInMilliseconds(endDate, startDate);
  }

  public isSameDay(dateLeft: Date | number, dateRight: Date | number): boolean {
    return isSameDay(dateLeft, dateRight);
  }

  public getCurrentDateString(): string {
    return this.getDateString(this.getCurrentDate());
  }

  public getCurrentHoursWithMinutes() {
    return this.getCurrentDate().toISOString().substring(11, 16);
  }

  public getDateInBrFormat(date?: Date, delimiter?: string): string {
    return this.format(
      date ?? this.getCurrentDate(),
      `dd${delimiter ?? '-'}MM${delimiter ?? '-'}yyyy`,
    );
  }
}
