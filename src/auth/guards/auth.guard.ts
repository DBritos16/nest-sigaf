import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usuarioModel: AuthService,
    private jwtService: JwtService
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const token = request.headers.token;

    if (!token) throw new UnauthorizedException('Invalid token');

    try {
      const payload = await this.jwtService.verifyAsync(token,{secret: 'mytemporalsecret'});

      const user = await this.usuarioModel.findUser(payload.idUsuario);

      if(!user) throw new UnauthorizedException('Usuario invalido');

      request.idUsuario = user.idUsuario;
      request.rol = user.rol;
      request.idEmpresa = user.empresas[0].idEmpresa ? user.empresas[0].idEmpresa : null;

    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}