import { Injectable, Inject} from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { Actividad } from './entities/actividad.entity';
import { InsumoActividad } from './entities/insumoActividad.entity';
import { Insumo } from '../insumos/entities/insumo.entity';
import { UnidadDeMedida } from '../insumos/entities/unidadDeMedida.entity';
import { Categoria } from '../insumos/entities/categoria.entity';
import { EmpleadoActividad } from './entities/empleadoActividad.entity';
import { Empleado } from '../empleados/entities/empleado.entity';

@Injectable()
export class ActividadesService {
  constructor(
    @Inject('actividadesRepository') private actividadModel: typeof Actividad,
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

    const insumosActividades = actividad.idInsumos.map(insumo => {
      return {
        ...insumo,
        idActividad: newActividad.idActividad,
      }
    })

    const empleadosActividades = actividad.empleados.map(empleado => {
      return {
        idEmpleado: empleado,
        idActividad: newActividad.idActividad
      }
    })

    await this.insumoActividadModel.bulkCreate(insumosActividades);
    
    if(actividad.empleados){
      await this.empleadoActividadModel.bulkCreate(empleadosActividades);
    }

    return this.getActividad(newActividad.idActividad);
    
  }
}
