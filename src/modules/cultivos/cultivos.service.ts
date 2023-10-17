import { Injectable, Inject } from '@nestjs/common';
import { CreateCultivoDto } from './dto/create-cultivo.dto';
import { Cultivo } from './entities/cultivo.entity';
import { Insumo } from '../insumos/entities/insumo.entity';
import { Campana } from '../campanas/entities/campana.entity';
import { Actividad } from '../actividades/entities/actividad.entity';
import { UnidadDeMedida } from '../insumos/entities/unidadDeMedida.entity';
import { Categoria } from '../insumos/entities/categoria.entity';

@Injectable()
export class CultivosService {
  constructor(@Inject('cultivosRepository') private cultivoModel: typeof Cultivo){}

  getCultivo(idParcela: string){
    return this.cultivoModel.findOne({
      where: {
        idParcela
      },
      include: [Insumo, Campana, {
        model: Actividad,
        include: [{
          model: Insumo, 
          attributes: ['nombre'],
          include: [{
            model: UnidadDeMedida,
            attributes: ['nombre']
          }, {
            model: Categoria,
            attributes: ['nombre']
          }],
        },
      ]
      }]
    });
  }

  postCultivo(cultivo: CreateCultivoDto){
    return this.cultivoModel.create({...cultivo});
  }


}
