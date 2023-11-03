import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { Response } from 'express'
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { EstableciemientosGuard } from '../auth/guards/estableciemientos.guard';

@UseGuards(AuthGuard, EstableciemientosGuard)
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  async getPost(@Req() req, @Res() res: Response){
    const stock = await this.stockService.getStock(req.idEstablecimiento);

    return res.json(stock);
  }

  @Post('vender')
  async venderStock(@Body() data: {idStock: string, cantidad: number, precio: number}, @Req() req, @Res() res: Response){

    const venta = await this.stockService.venderStock({...data, idEstablecimiento: req.idEstablecimiento});

    return res.json(venta);
  }

  @Get('/ventas')
  async getVentas(@Req() req, @Res() res: Response){
    const ventas = await this.stockService.getVentas(req.idEstablecimiento);

    return res.json(ventas);
  }

}
