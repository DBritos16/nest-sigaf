import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class EstableciemientosGuard implements CanActivate {
  constructor(private readonly authModel: AuthService) {}

  async canActivate(context: ExecutionContext,): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const IdEstablecimiento = request.headers.idestablecimiento;
   
    const establecimiento = await this.authModel.findEstablecimiento(IdEstablecimiento);

    if(!establecimiento) throw new UnauthorizedException('Establecimiento invalido');

    request.idEstablecimiento = establecimiento.idEstablecimiento;

    return true;
  }
}
