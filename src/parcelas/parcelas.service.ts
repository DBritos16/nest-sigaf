import { Injectable, Inject } from '@nestjs/common';
import { CreateParcelaDto } from './dto/create-parcela.dto';
import { Parcela } from './entities/parcela.entity';

@Injectable()
export class ParcelasService {
 constructor(@Inject('parcelasRepository')private parcelasModel: typeof Parcela){}


 getParcelas(idEstablecimiento: string){
    return this.parcelasModel.findAll({
        where: {
            idEstablecimiento
        },
        order: [['createdAt', 'ASC']],
    })
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
