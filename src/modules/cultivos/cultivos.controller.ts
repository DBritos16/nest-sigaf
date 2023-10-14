import { Controller, Get, Post, Body, Put, UseGuards, Req, Res, Param} from '@nestjs/common';
import { Response } from 'express'
import { CultivosService } from './cultivos.service';
import { CreateCultivoDto } from './dto/create-cultivo.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { EstableciemientosGuard } from '../auth/guards/estableciemientos.guard';
import { CampanasService } from '../campanas/campanas.service';
import { ParcelasService } from '../parcelas/parcelas.service';

@UseGuards(AuthGuard, EstableciemientosGuard)
@Controller('cultivos')
export class CultivosController {
  constructor(
    private readonly cultivosService: CultivosService,
    private readonly campanasService: CampanasService,
    private readonly parcelasService: ParcelasService
    ) {}



    @Get(':idParcela')
    async getCultivo(@Param('idParcela') idParcela: string, @Res() res: Response){
      const cultivo = await this.cultivosService.getCultivo(idParcela);

      return res.json(cultivo);
    }


  @Post()
  async postCultivo(@Body() cultivo: CreateCultivoDto, @Req() req, @Res() res: Response){

    const final = new Date();
    final.setMonth(final.getMonth() + cultivo.duracion);

    const campana = await this.campanasService.postCampana({final, idInsumo: cultivo.idInsumo});

    //@ts-ignore 
    await this.cultivosService.postCultivo({...cultivo, idCampana: campana.idCampana, idEstablecimiento: req.idEstablecimiento});

    const parcelaUpdated = await this.parcelasService.editParcela({enUso: true, color: 'green'}, cultivo.idParcela);

    return res.json(parcelaUpdated[1][0]);

  }
}
