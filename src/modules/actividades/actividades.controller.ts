import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ActividadesService } from './actividades.service';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { EstableciemientosGuard } from '../auth/guards/estableciemientos.guard';

@UseGuards(AuthGuard, EstableciemientosGuard)
@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}


  @Get('/all')
  async getAllACtividades(@Req() req, @Res() res: Response) {
    
    const actividades = await this.actividadesService.getAllACtividades(req.idEstablecimiento); 

    return res.json(actividades);
  }

  @Get()
  getActividades(idCultivo: string) {
    return this.actividadesService.getActividades(idCultivo);
  }

  @Post() 
  async postActividad(@Body() actividad: CreateActividadeDto, @Res() res: Response){
    const newActividad =  await this.actividadesService.postActividad(actividad);

    return res.json(newActividad);
  }


}
