import { IsNotEmpty, IsString, IsEmail} from 'class-validator'

export class loginUsuarioDto {
    @IsEmail()
    @IsNotEmpty({
       message: 'El correo esta vacio'
    })
    correo: string;

    @IsString()
    @IsNotEmpty({
        message: 'La contraseña esta vacia'
    })
    password: string;
}