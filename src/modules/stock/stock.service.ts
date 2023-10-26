import { Injectable, Inject} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { Stock } from './entities/stock.entity';
import { Insumo } from '../insumos/entities/insumo.entity';

@Injectable()
export class StockService {
  constructor(@Inject('stockRepository') private stockModel: typeof Stock ){}


  getStock(idEstablecimiento){
    return this.stockModel.findAll({
      where: {idEstablecimiento},
      include: [Insumo],
    
    });
  }

  postStock(stock: CreateStockDto){
    return this.stockModel.create({...stock});
  }

}
