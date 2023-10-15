import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { CreateActividadeDto } from './dto/create-actividade.dto';

@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}

  @Get()
  getActividades() {
    return this.actividadesService.getActividades();
  }

  @Post()
  postActividad(@Body() actividad: CreateActividadeDto){
    return this.actividadesService.postActividad(actividad);
  }


}
