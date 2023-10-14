import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config';
import { MorganModule, MorganInterceptor } from 'nest-morgan'
import { DatabaseModule } from './database/database.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { EstablecimientosModule } from './establecimientos/establecimientos.module';
import { ParcelasModule } from './parcelas/parcelas.module';
import { InsumosModule } from './insumos/insumos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }), MorganModule,
    DatabaseModule, UsuariosModule, AuthModule, EstablecimientosModule, ParcelasModule, InsumosModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev')
    }
  ],
})
export class AppModule { }
