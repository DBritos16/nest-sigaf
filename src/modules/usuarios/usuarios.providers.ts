import { Codigo } from "./entities/codigo.entity";
import { Empresa } from "./entities/empresa.entity";
import { Usuario } from "./entities/usuario.entity";

export const authProviders = [{provide: 'usuariosRepository', useValue: Usuario}];

export const codigoProviders = [{provide: 'codigosRepository', useValue: Codigo}];

export const empresaProviders = [{provide: 'empresasRepository', useValue: Empresa}];