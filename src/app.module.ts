import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { EstablecimientosModule } from './establecimientos/establecimientos.module';
import { AuthModule } from './auth/auth.module';
import { ParcelasModule } from './parcelas/parcelas.module';
import { InsumosModule } from './insumos/insumos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }), DatabaseModule, UsuariosModule, AuthModule, EstablecimientosModule, ParcelasModule, InsumosModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
