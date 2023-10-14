import { Injectable, Inject } from '@nestjs/common';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Empresa } from 'src/usuarios/entities/empresa.entity';
@Injectable()
export class AuthService {
  constructor(@Inject('usuariosRepository') private authModel: typeof Usuario){}

  findUser(idUsuario: string){
    return this.authModel.findByPk(idUsuario, {
      include: [Empresa]
    });
  }
 
}
