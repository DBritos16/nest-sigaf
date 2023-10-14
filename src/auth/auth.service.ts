import { Injectable, Inject } from '@nestjs/common';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Empresa } from 'src/usuarios/entities/empresa.entity';
import { Establecimiento } from 'src/establecimientos/entities/establecimiento.entity';
@Injectable()
export class AuthService {
  constructor(
    @Inject('usuariosRepository') private authModel: typeof Usuario,
    @Inject('establecimientosRepository') private establecimientoModel: typeof Establecimiento
    ){}

  findUser(idUsuario: string){
    return this.authModel.findByPk(idUsuario, {
      include: [Empresa]
    });
  }

  findEstablecimiento(idEstablecimiento: string){
    return this.establecimientoModel.findByPk(idEstablecimiento)
  }

}
