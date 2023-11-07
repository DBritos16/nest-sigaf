import { Injectable, Inject } from '@nestjs/common';
import { CreateCampanaDto } from './dto/create-campana.dto';
import { Campana } from './entities/campana.entity';
import { Op, Sequelize } from 'sequelize';
import sequelize from 'sequelize';
import { Cultivo } from '../cultivos/entities/cultivo.entity';
import { Actividad } from '../actividades/entities/actividad.entity';
import { Insumo } from '../insumos/entities/insumo.entity';

@Injectable()
export class CampanasService {
    constructor(@Inject('campanasRepository') private campanaModel: typeof Campana){}


    getCampanas(idEstablecimiento: string){
        return this.campanaModel.findAll({
            where: {
                idEstablecimiento
            }, include: [{
                model: Cultivo,
                include: [{
                    model: Actividad,
                    include: [Insumo]
                },{
                    model: Insumo
                }]
            }]
        });
    }


    postCampana(campana: CreateCampanaDto){
        return this.campanaModel.create({...campana});
    }

    isCampanaActive(idInsumo: string, idEstablecimiento: string) {
        return this.campanaModel.findOne({
            where: {
                idInsumo,
                idEstablecimiento,
                [Op.and]: [
                    sequelize.literal(`EXTRACT(MONTH FROM "createdAt") = ${new Date().getMonth() + 1}`),
                    sequelize.literal(`EXTRACT(YEAR FROM "createdAt") = ${new Date().getFullYear()}`),
                  ],
            }
        })
    }
}
