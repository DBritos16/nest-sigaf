import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ContabilidadService } from './contabilidad.service';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { EstableciemientosGuard } from '../auth/guards/estableciemientos.guard';

@UseGuards(AuthGuard, EstableciemientosGuard)
@Controller('contabilidad')
export class ContabilidadController {
  constructor(private readonly contabilidadService: ContabilidadService) {}

  @Get()
  async getContabilidad(@Req() req, @Res() res: Response){

    const data = await this.contabilidadService.getContabilidad(req.idEstablecimiento);

    res.json(data);
  }
}
