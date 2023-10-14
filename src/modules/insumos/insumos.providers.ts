import { Insumo } from "./entities/insumo.entity";

export const insumoProviders = [{provide: 'insumosRepository', useValue: Insumo}];