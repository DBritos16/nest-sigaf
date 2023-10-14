import { Cultivo } from "./entities/cultivo.entity";

export const cultivoProviders = [{provide: 'cultivosRepository', useValue: Cultivo}];