import { Establecimiento } from "./entities/establecimiento.entity";

export const establecimientoProviders = [{provide: 'establecimientosRepository', useValue: Establecimiento}];