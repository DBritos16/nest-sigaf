import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { EstablecimientosModule } from './establecimientos/establecimientos.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }), DatabaseModule, UsuariosModule, AuthModule, EstablecimientosModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
