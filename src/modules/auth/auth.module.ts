import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authProviders } from 'src/modules/usuarios/usuarios.providers';
import { establecimientoProviders } from 'src/modules/establecimientos/establecimiento.providers';

@Module({
  controllers: [],
  providers: [AuthService, ...authProviders, ...establecimientoProviders],
})
export class AuthModule {}
