import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { RuralProducer } from 'src/domain/entities/ruralProducer.entity';
import { IsCnpjOrCpf } from 'src/infra/providers/decorators/validateCpfCnpj';

export class RuralProducerDto {
  name: string;
  farm: string;
  city?: string;
  state?: string;
  document: string;
  totalArea?: number = 0.0;
  productiveArea?: number = 0.0;
  vegetationArea?: number = 0.0;
}

export class RequestRuralProducerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  farm: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    return value.replace(/[^0-9]/g, '');
  })
  @IsCnpjOrCpf()
  document: string;

  @IsOptional()
  @IsNumber()
  @ValidateIf(
    (RuralProducer: RuralProducerDto) =>
      RuralProducer.totalArea ===
      RuralProducer.productiveArea + RuralProducer.vegetationArea,
  )
  totalArea?: number = 0.0;

  @IsOptional()
  @IsNumber()
  productiveArea?: number = 0.0;

  @IsOptional()
  @IsNumber()
  vegetationArea?: number = 0.0;
}

export class QueryRuralProducerDto {
  query?: string;
  page: number;
  size: number;
}

export class RequestQueryRuralProducerDto {
  @IsOptional()
  @IsString()
  query?: string;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  page: number;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  size: number;
}