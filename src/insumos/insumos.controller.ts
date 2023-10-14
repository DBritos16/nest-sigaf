import { Controller, Get, Post, Body, Put, Param, Delete, Req, Res, UseGuards} from '@nestjs/common';
import { Response } from 'express';
import { InsumosService } from './insumos.service';
import { CreateInsumoDto } from './dto/create-insumo.dto';
import { ReqInsumoDto } from './dto/req-insumo.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { EstableciemientosGuard } from 'src/auth/guards/estableciemientos.guard';

@UseGuards(AuthGuard, EstableciemientosGuard)
@Controller('insumos')
export class InsumosController {
  constructor(private readonly insumosService: InsumosService) {}

  @Get()
  async getInsumos(@Req() req: ReqInsumoDto, @Res() res: Response){

    const insumos = await this.insumosService.getInsumos(req.idEstablecimiento);

    return res.json(insumos);
  }

  @Get('semillas')
  async getSemillas(@Req() req: ReqInsumoDto, @Res() res: Response){
    const semillas = await this.insumosService.getSemillas(req.idEstablecimiento);

    return res.json(semillas);
  }

  @Post()
  async postInsumo(@Body() insumo: CreateInsumoDto,@Req() req: ReqInsumoDto, @Res() res: Response){
    const newInsumo = await this.insumosService.postInsuomo({...insumo, idEstablecimiento: req.idEstablecimiento});
    
    return res.json(newInsumo);
  }

  @Delete(':idInsumo')
  async deleteInsumo(@Param('idInsumo') idInsumo: string, @Req() req: ReqInsumoDto, @Res() res: Response){

    const deletedInsumo = await this.insumosService.deleteInsumo(idInsumo, req.idEstablecimiento);

    return res.json(deletedInsumo);
  }
}
