import { Egreso } from "./entities/egreso.entity";
import { Ingreso } from "./entities/ingreso.entity";

export const egresoProvider = [{provide: 'egresoRepository', useValue: Egreso}];

export const ingresoProvider = [{provide: 'ingresoRepository', useValue: Ingreso}];