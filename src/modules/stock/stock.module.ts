import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { stockProviders } from './stock.providers';
import { authProviders } from '../usuarios/usuarios.providers';
import { AuthService } from '../auth/auth.service';
import { EstablecimientosService } from '../establecimientos/establecimientos.service';
import { establecimientoProviders } from '../establecimientos/establecimiento.providers';

@Module({
  controllers: [StockController],
  providers: [StockService, ...stockProviders,
     ...authProviders, AuthService,
    ...establecimientoProviders, ],
})
export class StockModule {}
