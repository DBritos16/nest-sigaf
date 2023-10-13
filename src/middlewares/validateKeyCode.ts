import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { ValidateKeyCodeDto } from 'src/auth/dto/validate-keycode.dto';

@Injectable()
export class ValidateKeyCode implements NestMiddleware {
    constructor(private usuariosService: AuthService){}
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