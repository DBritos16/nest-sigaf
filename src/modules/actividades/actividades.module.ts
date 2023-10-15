import { Module } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { actividadesProviders } from './actividades.providers';

@Module({
  controllers: [ActividadesController],
  providers: [ActividadesService, ...actividadesProviders],
})
export class ActividadesModule {}
