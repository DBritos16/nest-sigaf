import { Injectable, Inject } from '@nestjs/common';
import { CreateCampanaDto } from './dto/create-campana.dto';
import { Campana } from './entities/campana.entity';
import { Op, Sequelize } from 'sequelize';
import sequelize from 'sequelize';

@Injectable()
export class CampanasService {
    constructor(@Inject('campanasRepository') private campanaModel: typeof Campana){}

    postCampana(campana: CreateCampanaDto){
        return this.campanaModel.create({...campana});
    }

    isCampanaActive(idInsumo: string) {
        return this.campanaModel.findOne({
            where: {
                idInsumo,
                [Op.and]: [
                    sequelize.literal(`EXTRACT(MONTH FROM "createdAt") = ${new Date().getMonth() + 1}`),
                    sequelize.literal(`EXTRACT(YEAR FROM "createdAt") = ${new Date().getFullYear()}`),
                  ],
            }
        })
    }
}
