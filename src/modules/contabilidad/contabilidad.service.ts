import { Injectable, Inject } from '@nestjs/common';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { Egreso } from './entities/egreso.entity';
import { Ingreso } from './entities/ingreso.entity';
import { CreateEgresoDto } from './dto/create-egreso.dto';
import { Venta } from '../stock/entities/ventas.entity';
import { Stock } from '../stock/entities/stock.entity';
import { Insumo } from '../insumos/entities/insumo.entity';
import { UnidadDeMedida } from '../insumos/entities/unidadDeMedida.entity';
import { Categoria } from '../insumos/entities/categoria.entity';
import { SemillaCategoria } from '../insumos/entities/semillaCategoria.entity';

@Injectable()
export class ContabilidadService {
    constructor(
        @Inject('egresoRepository') private egresoModel: typeof Egreso ,
        @Inject('ingresoRepository') private ingresoModel: typeof Ingreso
    ){}

    async getContabilidad(idEstablecimiento: string) {
        const egreso = await this.egresoModel.findAll({ where: { idEstablecimiento },
        include: [{
            model: Insumo,
            attributes: ['nombre'],
            include: [{
                model: UnidadDeMedida,
                attributes: ['nombre', 'isoNombre']
            }, {
                model: Categoria,
                attributes: ['nombre']
            }]
        }] });
        const ingreso = await this.ingresoModel.findAll({ 
            where: { idEstablecimiento },
            include: [{
                model: Venta,
                include: [{
                    model: Stock,
                    include: [{
                        model: Insumo,
                        include: [{
                            model: SemillaCategoria,
                            attributes: ['nombre']
                        }]
                    }]
                }]
            }]
        });

        return {
            egreso,
            ingreso
        };
    }

    async createEgreso(egresoData: CreateEgresoDto): Promise<Egreso>{
        return this.egresoModel.create({...egresoData});
    }

    async createIngreso(ingresoData: CreateIngresoDto): Promise<Ingreso>{
        return this.ingresoModel.create({...ingresoData});
    }

}
