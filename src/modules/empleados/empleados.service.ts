import { Injectable, Inject } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { Empleado } from './entities/empleado.entity';

@Injectable()
export class EmpleadosService {
    constructor(@Inject('empleadosRepository') private empleadoModel: typeof Empleado){}

    getEmpleados(idEstablecimiento: string){
        return this.empleadoModel.findAll({
            where: {
                idEstablecimiento
            }
        });
    }

    createEmpleado(empleado: CreateEmpleadoDto){
        return this.empleadoModel.create({...empleado});
    }
}
