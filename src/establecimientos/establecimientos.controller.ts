import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpStatus, HttpException } from '@nestjs/common';
import { EstablecimientosService } from './establecimientos.service';
import { CreateEstablecimientoDto } from './dto/create-establecimiento.dto';

@Controller('establecimientos')
export class EstablecimientosController {
  constructor(private readonly establecimientosService: EstablecimientosService) {}


  @Get()
  async obtenerEstablecimientos(@Request() req: {idEmpresa: string}){
    const establecimientos = await this.establecimientosService.obtenerEstablecimientos(req.idEmpresa);
  }


  @Post()
  async crearEstablecieminto(@Body() data: CreateEstablecimientoDto){
    try {
      await this.establecimientosService.crearEstablecimiento(data);
      
      return HttpStatus.ACCEPTED;
    } catch (error) {
      console.log(error)
      throw new HttpException('Ocurrio un error al intentar crear el establecimiento', HttpStatus.FORBIDDEN)
    }

  }
}
