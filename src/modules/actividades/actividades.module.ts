import { Module } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { actividadesProviders, empleadoActividadProviders, insumoActividadProviders } from './actividades.providers';
import { insumoProviders } from '../insumos/insumos.providers';

@Module({
  controllers: [ActividadesController],
  providers: [ActividadesService, ...actividadesProviders, ...insumoActividadProviders, ...empleadoActividadProviders, ...insumoProviders],
})
export class ActividadesModule {}
