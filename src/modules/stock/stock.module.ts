import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { stockProviders, ventaProviders } from './stock.providers';
import { authProviders } from '../usuarios/usuarios.providers';
import { AuthService } from '../auth/auth.service';
import { EstablecimientosService } from '../establecimientos/establecimientos.service';
import { establecimientoProviders } from '../establecimientos/establecimiento.providers';
import { ContabilidadService } from '../contabilidad/contabilidad.service';
import { egresoProvider, ingresoProvider } from '../contabilidad/contabilidad.providers';

@Module({
  controllers: [StockController],
  providers: [StockService, ...stockProviders, ...ventaProviders,
    ...authProviders, AuthService,
    ...establecimientoProviders,
    ...ingresoProvider, ...egresoProvider, ContabilidadService],
})

export class StockModule {}
