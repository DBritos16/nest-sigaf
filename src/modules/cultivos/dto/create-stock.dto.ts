export class CreateStockDto {
    idCultivo: string;
    idInsumo: string;
    stock: number;
    vendidos?: number;
}
