import { Injectable, Inject } from '@nestjs/common';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { Parcela } from './entities/parcela.entity';
import { Cultivo } from '../cultivos/entities/cultivo.entity';
import { Insumo } from '../insumos/entities/insumo.entity';
import { Campana } from '../campanas/entities/campana.entity';
import { Actividad } from '../actividades/entities/actividad.entity';
import { UnidadDeMedida } from '../insumos/entities/unidadDeMedida.entity';
import { Categoria } from '../insumos/entities/categoria.entity';

@Injectable()
export class ParcelasService {
 constructor(@Inject('parcelasRepository')private parcelasModel: typeof Parcela){}


 getParcelas(idEstablecimiento: string){
    return this.parcelasModel.findAll({
        where: {
            idEstablecimiento
        },
        order: [['createdAt', 'DESC']],
        include: [{
            model: Cultivo,
            required: false,
            where: {cosechado: false},
            include: [{
              model: Insumo
            },{
                model: Campana, 
                where: {isActive: true}
            },{
                model: Actividad,
                include: [{
                    model: Insumo, 
                    attributes: {exclude: ['createdAt', 'updatedAt', 'idCategoria', 'idUnidadDeMedida']},
                    include: [{
                        model: UnidadDeMedida, attributes: ['nombre']
                    },{
                        model: Categoria, attributes: ['nombre']
                    }]
                }],
            }],
        }],
    },)
 }


 getParcela(idParcela: string){
    return this.parcelasModel.findByPk(idParcela);
 }

 createParcela(parcela: CreateParcelaDto){
    return this.parcelasModel.create({...parcela});
 }


 editParcela(parcela: CreateParcelaDto, idParcela: string){
    return this.parcelasModel.update(parcela, {
        where: {idParcela}, 
        returning: true
    });
 };

 deleteParcela(idParcela: string){
    return this.parcelasModel.destroy({
        where: {
            idParcela
        }
    });
 }
}
