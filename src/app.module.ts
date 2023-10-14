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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }), MorganModule,
    DatabaseModule, UsuariosModule, AuthModule, EstablecimientosModule, ParcelasModule, InsumosModule, CultivosModule, CampanasModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev')
    }
  ],
})
export class AppModule { }
