export class CreateStockDto {
    idStock?: string
    idEstablecimiento: string;
    idInsumo: string;
    stock: number;
    vendidos?: number;
}
