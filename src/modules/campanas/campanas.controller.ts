import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CampanasService } from './campanas.service';
import { CreateCampanaDto } from './dto/create-campana.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { EstableciemientosGuard } from '../auth/guards/estableciemientos.guard';


@UseGuards(AuthGuard, EstableciemientosGuard)
@Controller('campanas')
export class CampanasController {
  constructor(private readonly campanasService: CampanasService) {}
  
  @Get()
  async getCamapanas(@Req() req: {idEstablecimiento: string}, @Res() res: Response){
    const camapanas = await this.campanasService.getCampanas(req.idEstablecimiento);

    return res.json(camapanas);
  }
}
