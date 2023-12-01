import { Module } from '@nestjs/common';
import { InsumosService } from './insumos.service';
import { InsumosController } from './insumos.controller';
import { insumoProviders } from './insumos.providers';
import { authProviders } from 'src/modules/usuarios/usuarios.providers';
import { AuthService } from 'src/modules/auth/auth.service';
import { establecimientoProviders } from 'src/modules/establecimientos/establecimiento.providers';
import { egresoProvider, ingresoProvider } from '../contabilidad/contabilidad.providers';
import { ContabilidadService } from '../contabilidad/contabilidad.service';

@Module({
  controllers: [InsumosController],
  providers: [InsumosService, ...insumoProviders, 
    ...authProviders, ...establecimientoProviders, AuthService,
    ...egresoProvider, ...ingresoProvider, ContabilidadService
  ],
})
export class InsumosModule {}
