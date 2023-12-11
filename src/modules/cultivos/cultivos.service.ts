import { Injectable, Inject } from '@nestjs/common';
import { CreateCultivoDto } from './dto/create-cultivo.dto';
import { Cultivo } from './entities/cultivo.entity';
import { Insumo } from '../insumos/entities/insumo.entity';
import { Campana } from '../campanas/entities/campana.entity';
import { Actividad } from '../actividades/entities/actividad.entity';
import { UnidadDeMedida } from '../insumos/entities/unidadDeMedida.entity';
import { Categoria } from '../insumos/entities/categoria.entity';
import { Parcela } from '../parcelas/entities/parcela.entity';
import { Empleado } from '../empleados/entities/empleado.entity';

@Injectable()
export class CultivosService {
  constructor(@Inject('cultivosRepository') private cultivoModel: typeof Cultivo){}


  getCultivos(idEstablecimiento: string){
    return this.cultivoModel.findAll({
      include: [Insumo, Campana, {
        model: Parcela,
        where: {
          idEstablecimiento
        },
         required: true
      }, {
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

  getCultivoById(idCultivo: string, idEstablecimiento: string){
    return this.cultivoModel.findOne({
      where: {
        idCultivo
      },
      include: [Insumo, Campana, {
        model: Parcela,
        where: {
          idEstablecimiento
        },
         required: true
      }, {
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
        }, Empleado
      ]
      }]
    });
  }

  getCultivo(idParcela: string){
    return this.cultivoModel.findOne({
      where: {
        idParcela,
        cosechado: false
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

  cosechar(idCultivo: string){
    return this.cultivoModel.update({
      cosechado: true
    }, {
      where: {
        idCultivo
      }, returning: true
    });
  }
}
