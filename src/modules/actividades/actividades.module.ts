import { Module } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { actividadesProviders, insumoActividadProviders } from './actividades.providers';

@Module({
  controllers: [ActividadesController],
  providers: [ActividadesService, ...actividadesProviders, ...insumoActividadProviders],
})
export class ActividadesModule {}
