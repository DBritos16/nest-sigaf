import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ValidateKeyCodeDto } from 'src/usuarios/dto/validate-keycode.dto';

@Injectable()
export class ValidateKeyCode implements NestMiddleware {
    constructor(private usuariosService: UsuariosService){}
    async use(req, res: Response, next: NextFunction){
        
        const data: ValidateKeyCodeDto = req.query

        try {
            await this.usuariosService.validateAndDeleteKeyCode(data);
            
            next();
        } catch (error) {
            throw error;
        }
    }
}