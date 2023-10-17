import { Actividad } from "./entities/actividad.entity";
import { InsumoActividad } from "./entities/insumoActividad.entity";

export const actividadesProviders = [{provide: 'actividadesRepository', useValue: Actividad}];

export const insumoActividadProviders = [{provide: 'insumoActividadRepository', useValue: InsumoActividad}];