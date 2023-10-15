import { Actividad } from "./entities/actividad.entity";

export const actividadesProviders = [{provide: 'actividadesRepository', useValue: Actividad}];