import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { EstableciemientosGuard } from '../auth/guards/estableciemientos.guard';

@UseGuards(AuthGuard, EstableciemientosGuard)
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}




}
