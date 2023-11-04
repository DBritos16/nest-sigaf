import { Injectable, Inject} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { Stock } from './entities/stock.entity';
import { Insumo } from '../insumos/entities/insumo.entity';
import sequelize, { where } from 'sequelize';
import { UnidadDeMedida } from '../insumos/entities/unidadDeMedida.entity';
import { SemillaCategoria } from '../insumos/entities/semillaCategoria.entity';
import { Venta } from './entities/ventas.entity';
import { CreateVentaDto } from './dto/create-venta.dto';

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

  getStockById(idStock: string){
    return this.stockModel.findOne({
      where: {idStock},
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

  getVentaById(idVenta: string){
    return this.ventaModel.findOne({
      where: {
        idVenta
      },
      include: [{
        model: Stock,
        include: [Insumo]
      }]
    });
  }

  async postStock(stock: CreateStockDto){

    const existStock = await this.stockModel.findOne({
      where: {
        idInsumo: stock.idInsumo
      }
    });

    let newStock: CreateStockDto | null = null;

    if(!existStock) {
      newStock = await this.stockModel.create({...stock})
    } else {
      newStock = await existStock.update({stock: sequelize.literal(`stock + ${stock.stock}`)})
    }


    return this.getStockById(newStock.idStock);

  }

  async venderStock(data: CreateVentaDto){

     this.stockModel.update({
      stock: sequelize.literal(`stock - ${data.cantidad}`),
      vendidos: sequelize.literal(`vendidos + ${data.cantidad}`)
    }, {
      where: {
        idStock: data.idStock
      }
    });

     const ventaId = await this.ventaModel.create({...data})

     const stock = await this.getStockById(data.idStock);
     const venta = await this.getVentaById(ventaId.idVenta);

     return {
      stock,
      venta
     }

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

  async getStockVenta(idEstablecimiento: string){
    const stock = await this.getStock(idEstablecimiento);
    const ventas = await this.getVentas(idEstablecimiento);

    return {
      stock,
      ventas
    }
  }


  async deshacerVenta(idVenta: string){
    const ventaCancelada = await this.ventaModel.update({isActive: false},{
      where: {
        idVenta
      }, returning: true
    })


    const stockUpdate = await this.stockModel.update({
      stock: sequelize.literal(`stock + ${ventaCancelada[1][0].cantidad}`),
      vendidos: sequelize.literal(`vendidos - ${ventaCancelada[1][0].cantidad}`)
    }, {
      where: {
        idStock: ventaCancelada[1][0].idStock
      },
      returning: true
    })

    return {
      venta: ventaCancelada[1][0],
      stock: stockUpdate[1][0]
    }
  }
}
