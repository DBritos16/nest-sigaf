import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config';
import { MorganModule, MorganInterceptor } from 'nest-morgan'
import { DatabaseModule } from './database/database.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './modules/auth/auth.module';
import { EstablecimientosModule } from './modules/establecimientos/establecimientos.module';
import { ParcelasModule } from './modules/parcelas/parcelas.module';
import { InsumosModule } from './modules/insumos/insumos.module';
import { CultivosModule } from './modules/cultivos/cultivos.module';
import { CampanasModule } from './modules/campanas/campanas.module';
import { ActividadesModule } from './modules/actividades/actividades.module';
import { EmpleadosModule } from './modules/empleados/empleados.module';
import { StockModule } from './modules/stock/stock.module';
import { webSocketGateway } from './modules/webSocket/webSocket.gateway';
import { ContabilidadModule } from './modules/contabilidad/contabilidad.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }), MorganModule,
    DatabaseModule, UsuariosModule, AuthModule, EstablecimientosModule, ParcelasModule, InsumosModule, CultivosModule, CampanasModule, ActividadesModule, EmpleadosModule, StockModule, webSocketGateway, ContabilidadModule, CloudinaryModule],
  controllers: [],
  providers: [
    { 
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev')
    }
  ],
})
export class AppModule { }
