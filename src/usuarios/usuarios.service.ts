import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { loginUsuarioDto } from './dto/login-usuario.dto';
import { JwtService } from '@nestjs/jwt'
import { Codigo } from './entities/codigo.entity';
import { CreateCodigoDto } from './dto/create-codigo.dto';
import { ValidateKeyCodeDto } from './dto/validate-keycode.dto';
import { Empresa } from './entities/empresa.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject('usuariosRepository') private usuarioModel: typeof Usuario,
    @Inject('codigosRepository') private codigoModel: typeof Codigo,
    @Inject('empresasRepository') private empresaModel: typeof Empresa,
    private jwtService: JwtService 
    ){}
  
  
  async register(usuario: CreateUsuarioDto, empresa: CreateEmpresaDto){
    try {
      const hassPassword = bcrypt.hashSync(usuario.password, 10);
      
      const newUsuario = await this.usuarioModel.create({...usuario, password: hassPassword});
    
      await this.empresaModel.create({...empresa, idDueño: newUsuario.idUsuario});

      return HttpStatus.ACCEPTED

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
  
      if(!passwordIsValid) throw new HttpException('Contraseña incorrecta', HttpStatus.UNAUTHORIZED);

      const token = this.jwtService.sign({idUsuario: findUsuario.idUsuario});
  
      return {
        nombre: findUsuario.nombre,
        apellido: findUsuario.apellido,
        rol: findUsuario.rol,
        token
      }

    } catch (error) {
      console.log(error);
      throw error
    }
  }


  registerKey(data: CreateCodigoDto){
    return this.codigoModel.create({...data});
  }

  validarKey(key: string){
    return this.codigoModel.findOne({where: {key}})
  }

  async validateAndDeleteKeyCode(data: ValidateKeyCodeDto) {

    const { key, codigo, correo } = data;

    const validate = await this.codigoModel.findOne({
      where: {
        key, codigo, correo
      }
    });

    if(!validate) throw new HttpException('Error de autenticación', HttpStatus.UNAUTHORIZED);

    await this.codigoModel.destroy({
      where: { key, codigo, correo }
    });

    return HttpStatus.ACCEPTED
  }
}
