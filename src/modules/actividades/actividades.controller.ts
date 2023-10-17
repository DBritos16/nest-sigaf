import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { Response } from 'express';
import { ActividadesService } from './actividades.service';
import { CreateActividadeDto } from './dto/create-actividade.dto';

@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}

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
