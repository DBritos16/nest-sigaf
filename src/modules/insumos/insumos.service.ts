import { Injectable, Inject } from '@nestjs/common';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { Insumo } from './entities/insumo.entity';
import { Categoria } from './entities/categoria.entity';
import { UnidadDeMedida } from './entities/unidadDeMedida.entity';
import sequelize from 'sequelize';

@Injectable()
export class InsumosService {
  constructor(@Inject('insumosRepository') private insumoModel: typeof Insumo){}


  getInsumoInfo(idInsumo: string){
    return this.insumoModel.findOne({where: {idInsumo}, include: [UnidadDeMedida]})
    }

  getInsumos(idEstablecimiento: string){
    return this.insumoModel.findAll({
      where: {
        idEstablecimiento
      },
      include: [{
        model: Categoria,
        attributes: ['nombre']
      },{
        model: UnidadDeMedida,
        attributes: ['nombre']
      }
    ]
      
    });
  }

  getSemillas(idEstablecimiento: string){
    return this.insumoModel.findAll({
      where: {
        idEstablecimiento,
      }
    })
  }

  postInsuomo(insumo: CreateInsumoDto){
    return this.insumoModel.create({...insumo});
  }

  deleteInsumo(idInsumo: string, idEstablecimiento: string){
    return this.insumoModel.destroy({
      where: {idInsumo, idEstablecimiento}
    });
  }

  utilizarStock(stock: number, idInsumo: string){
    return this.insumoModel.update({utilizado: sequelize.literal(`utilizado + ${stock}`)}, {where: {idInsumo}});
  }

  renovarStock(stock: number, idInsumo: string){
    return this.insumoModel.update({stock: sequelize.literal(`stock + ${stock}`)}, {where: {idInsumo}});
  }



}
