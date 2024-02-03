import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
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
  @ApiProperty({ type: String, required: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: false })
  @IsNotEmpty()
  @IsString()
  farm: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => {
    return value.replace(/[^0-9]/g, '');
  })
  @IsCnpjOrCpf()
  document: string;

  @ApiProperty({ type: Number, required: false, default: 0.0 })
  @IsOptional()
  @IsNumber()
  @ValidateIf(
    (RuralProducer: RuralProducerDto) =>
      RuralProducer.totalArea ===
      RuralProducer.productiveArea + RuralProducer.vegetationArea,
  )
  totalArea?: number = 0.0;

  @ApiProperty({ type: Number, required: false, default: 0.0 })
  @IsOptional()
  @IsNumber()
  productiveArea?: number = 0.0;

  @ApiProperty({ type: Number, required: false, default: 0.0 })
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
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty({ type: Number, required: false, default: 0 })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  page: number;

  @ApiProperty({ type: Number, required: false, default: 10 })
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  size: number;
}