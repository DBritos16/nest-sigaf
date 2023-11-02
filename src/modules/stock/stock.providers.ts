import { Stock } from "./entities/stock.entity";
import { Venta } from "./entities/ventas.entity";

export const stockProviders = [{provide: 'stockRepository', useValue: Stock}];

export const ventaProviders = [{provide: 'ventaRepository', useValue: Venta}];

