import { Module } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { ParcelasController } from './parcelas.controller';
import { parcelaProviders } from './parcelas.providers';
import { authProviders } from 'src/usuarios/usuarios.providers';
import { AuthService } from 'src/auth/auth.service';
import { establecimientoProviders } from 'src/establecimientos/establecimiento.providers';

@Module({
  controllers: [ParcelasController],
  providers: [ParcelasService, ...parcelaProviders, ...authProviders, ...establecimientoProviders  ,AuthService, ],
})
export class ParcelasModule {}
