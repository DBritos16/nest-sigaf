import { Injectable, Inject } from '@nestjs/common';
import { CreateCultivoDto } from './dto/create-cultivo.dto';
import { Cultivo } from './entities/cultivo.entity';
import { Insumo } from '../insumos/entities/insumo.entity';
import { Campana } from '../campanas/entities/campana.entity';
import { Actividad } from '../actividades/entities/actividad.entity';

@Injectable()
export class CultivosService {
  constructor(@Inject('cultivosRepository') private cultivoModel: typeof Cultivo){}

  getCultivo(idParcela: string){
    return this.cultivoModel.findOne({
      where: {
        idParcela
      },
      include: [Insumo, Campana, Actividad]
    });
  }

  postCultivo(cultivo: CreateCultivoDto){
    return this.cultivoModel.create({...cultivo});
  }


}
