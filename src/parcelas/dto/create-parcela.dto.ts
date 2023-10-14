import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateParcelaDto {
    @IsNotEmpty()
    @IsArray()
    geoUbicacion: number[][][];
    
    @IsNotEmpty()
    @IsArray()
    center: number[];
    
    @IsNotEmpty()
    @IsString()
    area: number;

    @IsNumber()
    @IsNotEmpty()
    zoom: number;

    idEstablecimiento: string;
}
