import { Injectable, Inject} from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { Actividad } from './entities/actividad.entity';
import { InsumoActividad } from './entities/insumoActividad.entity';

@Injectable()
export class ActividadesService {
  constructor(
    @Inject('actividadesRepository') private actividadModel: typeof Actividad,
    @Inject('insumoActividadRepository') private insumoActividadModel: typeof InsumoActividad
    ){}
 

  getActividades(): Promise<Actividad[]>{
    return this.actividadModel.findAll();
  }


  async postActividad(actividad: CreateActividadeDto){
    console.log(actividad)
    const newActividad = await this.actividadModel.create({...actividad});

    const insumosActividades = actividad.idInsumos.map(insumo => {
      return {
        idActividad: newActividad.idActividad,
        idInsumo: insumo
      }
    })

    await this.insumoActividadModel.bulkCreate(insumosActividades);
  }
}
