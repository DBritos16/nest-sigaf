import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, Put } from '@nestjs/common';
import { Response } from 'express'
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { EstableciemientosGuard } from '../auth/guards/estableciemientos.guard';
import { get } from 'http';
import { CreateVentaDto } from './dto/create-venta.dto';

@UseGuards(AuthGuard, EstableciemientosGuard)
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}


  @Get('/all')
    async getStockVentas(@Req() req, @Res() res: Response){
      const todo = await this.stockService.getStockVenta(req.idEstablecimiento);

      return res.json(todo);
    }


  @Get()
  async getPost(@Req() req, @Res() res: Response){
    const stock = await this.stockService.getStock(req.idEstablecimiento);

    return res.json(stock);
  }

  @Post('vender')
  async venderStock(@Body() data: CreateVentaDto, @Req() req, @Res() res: Response){

    const venta = await this.stockService.venderStock({...data, idEstablecimiento: req.idEstablecimiento});

    return res.json(venta);
  }

  @Get('/ventas') 
  async getVentas(@Req() req, @Res() res: Response){
    const ventas = await this.stockService.getVentas(req.idEstablecimiento);

    return res.json(ventas);
  }


  @Put('/cancelar/:id')
  async deshacerVenta(@Param('id') idVenta: string, @Res() res: Response){
    const data = await this.stockService.deshacerVenta(idVenta);

    res.json(data);
  }

}
