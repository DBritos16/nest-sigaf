import { Injectable, Inject} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { Stock } from './entities/stock.entity';
import { Insumo } from '../insumos/entities/insumo.entity';
import sequelize from 'sequelize';
import { UnidadDeMedida } from '../insumos/entities/unidadDeMedida.entity';
import { SemillaCategoria } from '../insumos/entities/semillaCategoria.entity';
import { Venta } from './entities/ventas.entity';

@Injectable()
export class StockService {
  constructor(
    @Inject('stockRepository') private stockModel: typeof Stock,
    @Inject('ventaRepository') private ventaModel: typeof Venta
    ){}


  getStock(idEstablecimiento: string){
    return this.stockModel.findAll({
      where: {idEstablecimiento},
      include: [{
        model: Insumo,
        include: [{
          model: SemillaCategoria,
          attributes: ['nombre']
        }, {
          model: UnidadDeMedida,
          attributes: ['nombre']
        }]
      }],
    
    });
  }

  async postStock(stock: CreateStockDto){

    const existStock = await this.stockModel.findOne({
      where: {
        idInsumo: stock.idInsumo
      }
    });

    if(!existStock) return this.stockModel.create({...stock});

    return existStock.update({stock: sequelize.literal(`stock + ${stock.stock}`)});

  }

  venderStock(data: {idStock: string, cantidad: number, precio: number, idEstablecimiento: string}){

     this.stockModel.update({
      stock: sequelize.literal(`stock - ${data.cantidad}`),
      vendidos: sequelize.literal(`vendidos + ${data.cantidad}`)
    }, {
      where: {
        idStock: data.idStock
      }
    });

    return this.ventaModel.create(data)

  }

  getVentas(idEstablecimiento: string){
    return this.ventaModel.findAll({
      where: {
        idEstablecimiento
      },
      include: [{
        model: Stock,
        include: [Insumo]
      }]
    });
  };
}
