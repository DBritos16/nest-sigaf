import { IsNotEmpty, IsString, IsEmail, IsOptional} from 'class-validator'

export class CreateUsuarioDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido: string;

    @IsNotEmpty()
    @IsString()
    cuil: string;

    @IsString()
    @IsOptional()
    rol: string;

    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}
