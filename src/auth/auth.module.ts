import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authProviders } from 'src/usuarios/usuarios.providers';

@Module({
  controllers: [],
  providers: [AuthService, ...authProviders],
})
export class AuthModule {}
