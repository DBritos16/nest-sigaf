import { Module } from '@nestjs/common';
import { EstablecimientosService } from './establecimientos.service';
import { EstablecimientosController } from './establecimientos.controller';
import { establecimientoProviders } from './establecimiento.providers';
import { AuthService } from 'src/modules/auth/auth.service';
import { authProviders } from 'src/modules/usuarios/usuarios.providers';

@Module({
  controllers: [EstablecimientosController],
  providers: [EstablecimientosService, ...establecimientoProviders, ...authProviders, AuthService],
})
export class EstablecimientosModule {}
