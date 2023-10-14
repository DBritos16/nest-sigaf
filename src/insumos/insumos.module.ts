import { Module } from '@nestjs/common';
import { InsumosService } from './insumos.service';
import { InsumosController } from './insumos.controller';
import { insumoProviders } from './insumos.providers';
import { authProviders } from 'src/usuarios/usuarios.providers';
import { AuthService } from 'src/auth/auth.service';
import { establecimientoProviders } from 'src/establecimientos/establecimiento.providers';

@Module({
  controllers: [InsumosController],
  providers: [InsumosService, ...insumoProviders, ...authProviders, ...establecimientoProviders,AuthService,],
})
export class InsumosModule {}
