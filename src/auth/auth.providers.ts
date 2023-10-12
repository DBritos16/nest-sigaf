import { Codigo } from "./entities/codigo.entity";
import { Usuario } from "./entities/usuario.entity";

export const authProviders = [{provide: 'usuariosRepository', useValue: Usuario}];

export const codigoProviders = [{provide: 'codigosRepository', useValue: Codigo}];