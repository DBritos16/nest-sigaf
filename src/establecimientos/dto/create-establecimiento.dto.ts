import { IsNotEmpty, IsString, IsNumber, IsArray, IsUUID } from 'class-validator';

export class CreateEstablecimientoDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    provincia: string;

    @IsNotEmpty()
    @IsString()
    departamento: string;

    @IsNotEmpty()
    @IsString()
    localidad: string;

    @IsNotEmpty()
    @IsArray()
    geoUbicacion: number[][][];

    @IsNotEmpty()
    @IsArray()
    center: number[];

    @IsNotEmpty()
    @IsString()
    area: number;

    @IsNotEmpty()
    @IsNumber()
    zoom: number;


    idEmpresa: string;
}
