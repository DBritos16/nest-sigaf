import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { authProviders, codigoProviders, empresaProviders } from './usuarios.providers';
import { JwtModule } from '@nestjs/jwt'
import { ValidateKeyCode } from 'src/middlewares/validateKeyCode';

@Module({
  imports: [JwtModule.register({
    global: true,
    secret: 'mytemporalsecret',
    signOptions: { expiresIn: '60000s'}
  })],
  controllers: [UsuariosController],
  providers: [UsuariosService, ...authProviders, ...codigoProviders, ...empresaProviders],
})
export class UsuariosModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(ValidateKeyCode)
      .forRoutes('/auth/register');
  }
}
