import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { authProviders, codigoProviders } from './auth.providers';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: 'mytemporalsecret',
    signOptions: { expiresIn: '60000s'}
  })],
  controllers: [AuthController],
  providers: [AuthService, ...authProviders, ...codigoProviders],
})
export class AuthModule {}
