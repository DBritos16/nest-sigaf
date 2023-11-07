import { Module } from '@nestjs/common';
import { CampanasService } from './campanas.service';
import { CampanasController } from './campanas.controller';
import { campanasProviders } from './campanas.providers';
import { authProviders } from '../usuarios/usuarios.providers';
import { AuthService } from '../auth/auth.service';
import { establecimientoProviders } from '../establecimientos/establecimiento.providers';
import { EstablecimientosService } from '../establecimientos/establecimientos.service';

@Module({
  controllers: [CampanasController],
  providers: [CampanasService, ...campanasProviders, ...authProviders, AuthService, ...establecimientoProviders, EstablecimientosService],
})
export class CampanasModule {}
