import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { EstablecimientosModule } from './establecimientos/establecimientos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }), DatabaseModule, AuthModule, EstablecimientosModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
