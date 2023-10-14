export class CreateCultivoDto {
    stock?:number;
    totalCultivado: number;
    cosechado?: boolean;
    duracion: number;
    idInsumo: string;
    idCampana: string;
    idParcela: string;
}
