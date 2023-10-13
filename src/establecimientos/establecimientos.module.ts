import { Module } from '@nestjs/common';
import { EstablecimientosService } from './establecimientos.service';
import { EstablecimientosController } from './establecimientos.controller';
import { establecimientoProviders } from './establecimiento.providers';

@Module({
  controllers: [EstablecimientosController],
  providers: [EstablecimientosService, ...establecimientoProviders],
})
export class EstablecimientosModule {}
