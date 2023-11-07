import { Module } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { actividadesProviders, empleadoActividadProviders, insumoActividadProviders } from './actividades.providers';
import { insumoProviders } from '../insumos/insumos.providers';
import { authProviders } from '../usuarios/usuarios.providers';
import { AuthService } from '../auth/auth.service';
import { establecimientoProviders } from '../establecimientos/establecimiento.providers';
import { EstablecimientosService } from '../establecimientos/establecimientos.service';

@Module({
  controllers: [ActividadesController],
  providers: [ActividadesService, ...actividadesProviders, ...insumoActividadProviders, ...empleadoActividadProviders, ...insumoProviders,
  ...authProviders, AuthService,
  ...establecimientoProviders, EstablecimientosService],
})
export class ActividadesModule {}
