import { Injectable, Inject} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {
  constructor(@Inject('stockRepository') private stockModel: typeof Stock ){}

  postStock(stock: CreateStockDto){
    return this.stockModel.create({...stock});
  }

}
