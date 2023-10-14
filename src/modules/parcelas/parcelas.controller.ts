import { Controller, Get, Post, Body, Put, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { ReqParcelaDto } from './dto/req-parcela.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { EstableciemientosGuard } from 'src/modules/auth/guards/estableciemientos.guard';

@UseGuards(AuthGuard, EstableciemientosGuard)
@Controller('parcelas')
export class ParcelasController {
  constructor(private readonly parcelasService: ParcelasService) {}

  @Get()
  async getParcelas(@Req() req: ReqParcelaDto, @Res() res){

    const { idEstablecimiento } = req;

    const parcelas = await this.parcelasService.getParcelas(idEstablecimiento);

    return res.json(parcelas);
  }

  @Post()
  async createParcela(@Body() parcela: CreateParcelaDto, @Req() req: ReqParcelaDto, @Res() res){
    const { idEstablecimiento } = req;
    
    const newParcela = await this.parcelasService.createParcela({...parcela, idEstablecimiento});

    return res.json(newParcela);
  }


  @Put(':idParcela')
  async editParcela(@Body() parcela: CreateParcelaDto, @Param('idParcela') idParcela: string, @Res() res){

    const updateParcela = await this.parcelasService.editParcela(parcela, idParcela);

    return res.json(updateParcela[1][0]);
  }

  @Delete(':idParcela')
  async deleteParcela(@Param('idParcela') idParcela: string, @Res() res){
      
      const deletedParcela = await this.parcelasService.deleteParcela(idParcela);
  
      return res.json(deletedParcela);
    }
}
