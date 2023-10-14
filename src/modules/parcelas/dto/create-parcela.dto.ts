import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString, IsOptional} from "class-validator";

export class CreateParcelaDto {
    @IsNotEmpty()
    @IsArray()
    geoUbicacion?: number[][][];
    
    @IsNotEmpty()
    @IsArray()
    center?: number[];
    
    @IsNotEmpty()
    @IsString()
    area?: number;

    @IsNumber()
    @IsNotEmpty()
    zoom?: number;

    @IsOptional()
    color?: string;

    @IsOptional()
    enUso?: boolean;

    idEstablecimiento?: string;
}
