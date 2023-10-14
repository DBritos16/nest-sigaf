import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpStatus, HttpException, UseGuards, Res } from '@nestjs/common';
import { EstablecimientosService } from './establecimientos.service';
import { CreateEstablecimientoDto } from './dto/create-establecimiento.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('establecimientos')
export class EstablecimientosController {
  constructor(private readonly establecimientosService: EstablecimientosService) {}


  @Get()
  async obtenerEstablecimientos(@Request() req: {idEmpresa: string}, @Res() res){
    const establecimientos = await this.establecimientosService.obtenerEstablecimientos(req.idEmpresa);

    return res.json(establecimientos);
  }


  @Post()
  async crearEstablecieminto(@Body() data: CreateEstablecimientoDto, @Request() req: {idEmpresa: string}){
    try {
      
      await this.establecimientosService.crearEstablecimiento({...data, idEmpresa: req.idEmpresa});
      
      return HttpStatus.ACCEPTED;
    } catch (error) {
      console.log(error)
      throw new HttpException('Ocurrio un error al intentar crear el establecimiento', HttpStatus.FORBIDDEN)
    }

  }
}
