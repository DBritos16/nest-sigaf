import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { EstableciemientosGuard } from '../auth/guards/estableciemientos.guard';

@UseGuards(AuthGuard, EstableciemientosGuard)
@Controller('empleados')
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}
  
  @Get()
  async getEmpleados(@Req() req, @Res() res: Response){

    const empleados = await this.empleadosService.getEmpleados(req.idEstablecimiento);

    return res.json(empleados);
  }
}
