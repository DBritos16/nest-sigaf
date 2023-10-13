import { Injectable, Inject } from '@nestjs/common';
import { CreateEstablecimientoDto } from './dto/create-establecimiento.dto';
import { Establecimiento } from './entities/establecimiento.entity';

@Injectable()
export class EstablecimientosService {
  constructor(@Inject('establecimientosRepository') private establecimientoModel: typeof Establecimiento){}

  crearEstablecimiento(establecimiento: CreateEstablecimientoDto){
    return this.establecimientoModel.create({...establecimiento});
  }

  obtenerEstablecimientos(idEmpresa: string){
    return this.establecimientoModel.findAll({
        where: {
            idEmpresa
        }
    });
  }


  
}
