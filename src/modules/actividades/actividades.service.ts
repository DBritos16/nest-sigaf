import { Injectable, Inject} from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { Actividad } from './entities/actividad.entity';
import { InsumoActividad } from './entities/insumoActividad.entity';
import { Insumo } from '../insumos/entities/insumo.entity';
import { UnidadDeMedida } from '../insumos/entities/unidadDeMedida.entity';
import { Categoria } from '../insumos/entities/categoria.entity';
import { EmpleadoActividad } from './entities/empleadoActividad.entity';
import { Empleado } from '../empleados/entities/empleado.entity';
import sequelize from 'sequelize';

@Injectable()
export class ActividadesService {
  constructor(
    @Inject('actividadesRepository') private actividadModel: typeof Actividad,
    @Inject('insumosRepository') private insumoModel: typeof Insumo,
    @Inject('insumoActividadRepository') private insumoActividadModel: typeof InsumoActividad,
    @Inject('empleadoActividadRepository') private empleadoActividadModel: typeof EmpleadoActividad
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
      }, Empleado
    ]});
  }


  async postActividad(actividad: CreateActividadeDto){
    const newActividad = await this.actividadModel.create({...actividad});

    const insumosActividades: any[] = actividad.idInsumos.map(insumo => {
      return {
        ...insumo,
        idActividad: newActividad.idActividad,
      }
    })

    console.log(insumosActividades)
    const empleadosActividades = actividad.empleados.map(empleado => {
      return {
        idEmpleado: empleado,
        idActividad: newActividad.idActividad
      }
    })

    await this.insumoActividadModel.bulkCreate(insumosActividades);

    insumosActividades.forEach(async insumo => {
      console.log(insumo)
      await this.insumoModel.update({stockUtilizado: sequelize.literal(`"stockUtilizado" + ${parseInt(insumo.stockUtilizado)}`)}, {where: {idInsumo: insumo.idInsumo}});
    })
    
    if(actividad.empleados){
      await this.empleadoActividadModel.bulkCreate(empleadosActividades);
    }

    return this.getActividad(newActividad.idActividad);
    
  }
}
