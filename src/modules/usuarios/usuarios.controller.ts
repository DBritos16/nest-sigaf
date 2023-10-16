import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { loginUsuarioDto } from './dto/login-usuario.dto';
import { enviarEmail } from 'src/helpers/sendEmail';
import { generateKey } from 'src/helpers/generateKey';
import { generateCode } from 'src/helpers/generateCode';
import { CreateEmpresaDto } from './dto/create-empresa.dto';

@Controller('auth')
export class UsuariosController {

  constructor(private usuariosService: UsuariosService) { }

  @Post('/register')
  async register(@Body('data') usuario: CreateUsuarioDto, @Body('empresa') empresa: CreateEmpresaDto, @Res() res) {
    
     await this.usuariosService.register(usuario, empresa);

    return res.json({
      message: 'Registrado con exito'
    });
  }

  @Post('/login')
  async login(@Body() usuario: loginUsuarioDto, @Res() res) {
    const login = await this.usuariosService.login(usuario);

    if(login){
      return res.json(login)
    }
  }

  
  @Post('/validate')
  async registerKey(@Body() body, @Res() res) {

    try {
      const { correo } = body;
      const key = generateKey();
      const codigo = generateCode();

      await this.usuariosService.registerKey({ key, codigo, correo });

      

      return res.json({ key });
    }

    catch (error) {
      console.log(error)
    }
  }

  @Get('/validarkey/:key')
  async validarKey(@Param('key') key: string, @Res() res) {
    try {
      const isValid = await this.usuariosService.validarKey(key);

      if(!isValid){
        return res.status(400).json({msg: 'La key no es valida'});
      }

      return res.json(isValid);
    } catch (error) {
      console.log(error);
    }
  }
    
  }