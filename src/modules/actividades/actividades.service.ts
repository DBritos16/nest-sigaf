import { Injectable, Inject} from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { Actividad } from './entities/actividad.entity';

@Injectable()
export class ActividadesService {
  constructor(@Inject('actividadesRepository') private actividadModel: typeof Actividad){}


  getActividades(): Promise<Actividad[]>{
    return this.actividadModel.findAll();
  }


  postActividad(actividad: CreateActividadeDto){
    return this.actividadModel.create({...actividad});
  }
}
