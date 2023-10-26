import { IsNotEmpty, IsNumber, IsString, Min, isNotEmpty, isNumber } from 'class-validator';


export class CreateCultivoDto {

    @IsNotEmpty({
        message: 'Seleccione un insumo para sembrar'
    })
    idInsumo: string;


    @IsNotEmpty({
        message: 'Ingrese una cantidad a sembrar'
    })
    
    @IsNumber()
    @Min(1, {
        message: 'Ingrese una cantidad valida para sembrar'
    })
    totalCultivado: number;

    cosechado?: boolean;

    @IsNotEmpty()
    duracion: number;

    idCampana: string;

    @IsNotEmpty()
    idParcela: string;

    idEstablecimiento: string;
}
