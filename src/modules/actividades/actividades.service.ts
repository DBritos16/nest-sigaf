import { Injectable, Inject} from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { Actividad } from './entities/actividad.entity';
import { InsumoActividad } from './entities/insumoActividad.entity';
import { Insumo } from '../insumos/entities/insumo.entity';
import { UnidadDeMedida } from '../insumos/entities/unidadDeMedida.entity';
import { Categoria } from '../insumos/entities/categoria.entity';

@Injectable()
export class ActividadesService {
  constructor(
    @Inject('actividadesRepository') private actividadModel: typeof Actividad,
    @Inject('insumoActividadRepository') private insumoActividadModel: typeof InsumoActividad
    ){}
 

  getActividades(idCultivo: string): Promise<Actividad[]>{
    return this.actividadModel.findAll({
      where: {idCultivo},
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
    ]});
  }

  getActividad(idActividad: string): Promise<Actividad>{
    return this.actividadModel.findOne({
      where: {idActividad},
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
    ]});
  }


  async postActividad(actividad: CreateActividadeDto){
    const newActividad = await this.actividadModel.create({...actividad});

    const insumosActividades = actividad.idInsumos.map(insumo => {
      return {
        ...insumo,
        idActividad: newActividad.idActividad,
      }
    })

    await this.insumoActividadModel.bulkCreate(insumosActividades);

    return this.getActividad(newActividad.idActividad);
    
  }
}
