import { Campana } from "./entities/campana.entity";

export const campanasProviders = [{provide: 'campanasRepository', useValue: Campana}];