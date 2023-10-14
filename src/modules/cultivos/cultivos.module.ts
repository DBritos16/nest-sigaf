import { Module } from '@nestjs/common';
import { CultivosService } from './cultivos.service';
import { CultivosController } from './cultivos.controller';
import { cultivoProviders } from './cultivos.providers';
import { authProviders } from '../usuarios/usuarios.providers';
import { establecimientoProviders } from '../establecimientos/establecimiento.providers';
import { AuthService } from '../auth/auth.service';
import { campanasProviders } from '../campanas/campanas.providers';
import { CampanasService } from '../campanas/campanas.service';
import { parcelaProviders } from '../parcelas/parcelas.providers';
import { ParcelasService } from '../parcelas/parcelas.service';

@Module({
  controllers: [CultivosController],
  providers: [CultivosService, ...cultivoProviders, ...authProviders, ...establecimientoProviders, AuthService, 
    ...campanasProviders, CampanasService,
    ...parcelaProviders, ParcelasService
  ],
})
export class CultivosModule {}