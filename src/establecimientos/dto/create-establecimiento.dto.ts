import { IsNotEmpty, IsString } from 'class-validator';

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
    @IsString()
    geoUbicacion: number[][][];

    @IsNotEmpty()
    @IsString()
    center: number[];

    @IsNotEmpty()
    @IsString()
    area: number;

    @IsNotEmpty()
    @IsString()
    zoom: number;

}
