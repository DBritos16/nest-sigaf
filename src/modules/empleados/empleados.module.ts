import { Module } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosController } from './empleados.controller';
import { empleadosProviders } from './empleados.providers';
import { authProviders } from '../usuarios/usuarios.providers';
import { AuthService } from '../auth/auth.service';
import { establecimientoProviders } from '../establecimientos/establecimiento.providers';
import { EstablecimientosService } from '../establecimientos/establecimientos.service';

@Module({
  controllers: [EmpleadosController],
  providers: [EmpleadosService, ...empleadosProviders, 
    ...authProviders, AuthService,
    ...establecimientoProviders, EstablecimientosService],
})
export class EmpleadosModule {}
