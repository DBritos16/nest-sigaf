import { Actividad } from "./entities/actividad.entity";
import { EmpleadoActividad } from "./entities/empleadoActividad.entity";
import { InsumoActividad } from "./entities/insumoActividad.entity";

export const actividadesProviders = [{provide: 'actividadesRepository', useValue: Actividad}];

export const insumoActividadProviders = [{provide: 'insumoActividadRepository', useValue: InsumoActividad}];

export const empleadoActividadProviders = [{provide: 'empleadoActividadRepository', useValue: EmpleadoActividad}];