export class CreateStockDto {
    idEstablecimiento: string;
    idInsumo: string;
    stock: number;
    vendidos?: number;
}
