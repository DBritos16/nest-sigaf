import { Controller, Get, Post, Body, Put, UseGuards, Req, Res, Param} from '@nestjs/common';
import { Response } from 'express'
import { CultivosService } from './cultivos.service';
import { CreateCultivoDto } from './dto/create-cultivo.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { EstableciemientosGuard } from '../auth/guards/estableciemientos.guard';
import { CampanasService } from '../campanas/campanas.service';
import { ParcelasService } from '../parcelas/parcelas.service';
import { InsumosService } from '../insumos/insumos.service';
import { ActividadesService } from '../actividades/actividades.service';
import { StockService } from '../stock/stock.service';
import { CreateStockDto } from './dto/create-stock.dto';

@UseGuards(AuthGuard, EstableciemientosGuard)
@Controller('cultivos')
export class CultivosController {
  constructor(
    private readonly cultivosService: CultivosService,
    private readonly campanasService: CampanasService,
    private readonly parcelasService: ParcelasService,
    private readonly insumosService: InsumosService,
    private readonly actividadesService: ActividadesService,
    private readonly stockService: StockService
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

    const isCampanaActive = await this.campanasService.isCampanaActive(cultivo.idInsumo, req.idEstablecimiento);
    let idCampana = '';

    if(!isCampanaActive){
      const campana = await this.campanasService.postCampana({final, idInsumo: cultivo.idInsumo, idEstablecimiento: req.idEstablecimiento});
      idCampana = campana.idCampana;
    } else {
      idCampana = isCampanaActive.idCampana;
    }

    const newCultivo = await this.cultivosService.postCultivo({...cultivo, idCampana, idEstablecimiento: req.idEstablecimiento});

    const insumo = await this.insumosService.getInsumoInfo(cultivo.idInsumo);

    await this.actividadesService.postActividad({
      titulo: 'Sembrado',
      descripcion: `Se sembro ${cultivo.totalCultivado} ${insumo.unidadDeMedida.nombre} de ${insumo.nombre}`,
      idCultivo: newCultivo.idCultivo,
      idInsumos: [{
        idInsumo: cultivo.idInsumo,
        stockUtilizado: cultivo.totalCultivado
      }],
      empleados: []
    })

    const parcelaUpdated = await this.parcelasService.editParcela({enUso: true, color: 'green'}, cultivo.idParcela);


    return res.json(parcelaUpdated[1][0]);

  }


  @Post('cosechar')
  async cosechar(@Body() cosecha: CreateStockDto, @Req() req, @Res() res: Response){
    const cosechado = await this.cultivosService.cosechar(cosecha.idCultivo);
    
    const newStock = await this.stockService.postStock({...cosecha, idEstablecimiento: req.idEstablecimiento});
    //@ts-ignore
    await this.parcelasService.editParcela({enUso: false, color: '#fff'}, cosechado[1][0].idParcela);

    return res.json(newStock);
  }
}
