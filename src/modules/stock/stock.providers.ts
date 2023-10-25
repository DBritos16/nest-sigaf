import { Stock } from "./entities/stock.entity";

export const stockProviders = [{provide: 'stockRepository', useValue: Stock}];