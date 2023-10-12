import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { loginUsuarioDto } from './dto/login-usuario.dto';
import { enviarEmail } from 'src/helpers/sendEmail';
import { generateKey } from 'src/helpers/generateKey';
import { generateCode } from 'src/helpers/generateCode';

@Controller('auth')
export class AuthController {

  constructor(private usuariosService: AuthService) { }

  @Post('/register')
  async register(@Body() usuario: CreateUsuarioDto, @Res() res) {

    const newUsuario = await this.usuariosService.register(usuario);

    return res.json(newUsuario);
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

      enviarEmail({
        subject: 'Confirma tu cuenta',
        codigo,
        toEmail: correo
      });

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