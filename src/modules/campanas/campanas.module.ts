import { Module } from '@nestjs/common';
import { CampanasService } from './campanas.service';
import { CampanasController } from './campanas.controller';
import { campanasProviders } from './campanas.providers';

@Module({
  controllers: [CampanasController],
  providers: [CampanasService, ...campanasProviders],
})
export class CampanasModule {}
