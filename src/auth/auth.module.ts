import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { authProviders, codigoProviders, empresaProviders } from './auth.providers';
import { JwtModule } from '@nestjs/jwt'
import { ValidateKeyCode } from 'src/middlewares/validateKeyCode';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: 'mytemporalsecret',
    signOptions: { expiresIn: '60000s'}
  })],
  controllers: [AuthController],
  providers: [AuthService, ...authProviders, ...codigoProviders, ...empresaProviders],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(ValidateKeyCode)
      .forRoutes('/auth/register');
  }
}
