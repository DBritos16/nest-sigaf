import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { EstableciemientosGuard } from '../auth/guards/estableciemientos.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@UseGuards(AuthGuard, EstableciemientosGuard)
@Controller('empleados')
export class EmpleadosController {
  constructor(
    private readonly empleadosService: EmpleadosService,
    private readonly cloudinaryService: CloudinaryService
    ) {}
  

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  async createEmpleado(@Body() empleado: CreateEmpleadoDto, @Req() req, @Res() res: Response, @UploadedFile() file: Express.Multer.File) {

    const image = await this.cloudinaryService.uploadFile(file);

    const newEmpleado = await this.empleadosService.createEmpleado({
      ...empleado, 
      imagen: image.secure_url, 
      imagenId: image.public_id,
      idEstablecimiento: req.idEstablecimiento
    })

    return res.json(newEmpleado);

  }

  @Get()
  async getEmpleados(@Req() req, @Res() res: Response){

    const empleados = await this.empleadosService.getEmpleados(req.idEstablecimiento);

    return res.json(empleados);
  }
}
