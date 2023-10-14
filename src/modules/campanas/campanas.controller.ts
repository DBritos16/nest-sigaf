import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampanasService } from './campanas.service';
import { CreateCampanaDto } from './dto/create-campana.dto';

@Controller('campanas')
export class CampanasController {
  constructor(private readonly campanasService: CampanasService) {}

}
