import { Module } from '@nestjs/common';
import { ContabilidadService } from './contabilidad.service';
import { ContabilidadController } from './contabilidad.controller';
import { egresoProvider, ingresoProvider } from './contabilidad.providers';
import { AuthService } from '../auth/auth.service';
import { authProviders } from '../usuarios/usuarios.providers';
import { establecimientoProviders } from '../establecimientos/establecimiento.providers';
import { EstablecimientosService } from '../establecimientos/establecimientos.service';

@Module({
  controllers: [ContabilidadController],
  providers: [ContabilidadService,
    ...egresoProvider, ...ingresoProvider,
    ...authProviders, AuthService,
    ...establecimientoProviders, EstablecimientosService],
})

export class ContabilidadModule {}
