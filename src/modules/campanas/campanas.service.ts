import { Injectable, Inject } from '@nestjs/common';
import { CreateCampanaDto } from './dto/create-campana.dto';
import { Campana } from './entities/campana.entity';

@Injectable()
export class CampanasService {
    constructor(@Inject('campanasRepository') private campanaModel: typeof Campana){}

    postCampana(campana: CreateCampanaDto){
        return this.campanaModel.create({...campana});
    }
}
