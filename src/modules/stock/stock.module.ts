import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { stockProviders } from './stock.providers';

@Module({
  controllers: [StockController],
  providers: [StockService, ...stockProviders],
})
export class StockModule {}
