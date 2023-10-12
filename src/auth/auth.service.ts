import { Injectable, Inject, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { loginUsuarioDto } from './dto/login-usuario.dto';
import { JwtService } from '@nestjs/jwt'
import { Codigo } from './entities/codigo.entity';
import { CreateCodigoDto } from './dto/create-codigo.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('usuariosRepository') private usuarioModel: typeof Usuario,
    @Inject('codigosRepository') private codigoModel: typeof Codigo,
    private jwtService: JwtService 
    ){}
  
  
  register(usuario: CreateUsuarioDto){
    try {
      const hassPassword = bcrypt.hashSync(usuario.password, 10);
      
      return this.usuarioModel.create({...usuario, password: hassPassword});

    } catch (error) {
      console.log(error);
      return new HttpException({
        status: HttpStatus.FORBIDDEN,
        msg: 'Ocurrio un error al intentar registrarse',
      }, HttpStatus.FORBIDDEN).getResponse();
    }

  }
  

  async login(usuario: loginUsuarioDto){

    try {
      const findUsuario = await this.usuarioModel.findOne({where: {correo: usuario.correo}});
  
      if(!findUsuario){
        return findUsuario;
      }
  
      const passwordIsValid = bcrypt.compareSync(usuario.password, findUsuario.password);
  
      if(!passwordIsValid){
        return new HttpException({
          status: HttpStatus.UNAUTHORIZED,
          msg: 'Contraseña incorrecta'
        }, HttpStatus.UNAUTHORIZED).getResponse();
      }

      const token = this.jwtService.sign({idUsuario: findUsuario.idUsuario});
  
      return {
        nombre: findUsuario.nombre,
        apellido: findUsuario.apellido,
        rol: findUsuario.rol,
        token
      }

    } catch (error) {
      console.log(error);
      return new HttpException({
        status: HttpStatus.FORBIDDEN,
        msg: 'Ocurrio un error al intentar iniciar sesión',
      }, HttpStatus.FORBIDDEN).getResponse();
    }
  }


  registerKey(data: CreateCodigoDto){
    return this.codigoModel.create({...data});
  }

  validarKey(key: string){
    return this.codigoModel.findOne({where: {key}})
  }

}
