import { Empleado } from "./entities/empleado.entity";

export const empleadosProviders = [{provide: 'empleadosRepository', useValue: Empleado}];