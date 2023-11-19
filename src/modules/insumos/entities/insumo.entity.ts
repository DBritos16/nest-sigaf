import { Table, Model, PrimaryKey, Column, DataType, BelongsTo, ForeignKey, HasMany, BelongsToMany} from 'sequelize-typescript'
import { Establecimiento } from 'src/modules/establecimientos/entities/establecimiento.entity';
import { Categoria } from './categoria.entity';
import { UnidadDeMedida } from './unidadDeMedida.entity';
import { Cultivo } from 'src/modules/cultivos/entities/cultivo.entity';
import { Campana } from 'src/modules/campanas/entities/campana.entity';
import { InsumoActividad } from 'src/modules/actividades/entities/insumoActividad.entity';
import { Actividad } from 'src/modules/actividades/entities/actividad.entity';
import { Stock } from 'src/modules/stock/entities/stock.entity';
import { SemillaCategoria } from './semillaCategoria.entity';
import { Egreso } from 'src/modules/contabilidad/entities/egreso.entity';

@Table({
    tableName: 'insumos'
})
export class Insumo extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        field: 'idInsumo'
    })
    idInsumo: string;

    @Column
    nombre: string;

    @Column
    stock: number;

    @Column({
        type: DataType.FLOAT,
        defaultValue: 0
    })
    stockUtilizado: number;

    @Column
    duracion: number;

    @Column({
        type: DataType.FLOAT
    })
    precio: number;

    @ForeignKey(() => Establecimiento)
    @Column({
        type: DataType.UUID
    })
    idEstablecimiento: string;

    @BelongsTo(()=>Establecimiento)
    establecimiento: Establecimiento

    @ForeignKey(()=> Categoria)
    @Column({
        type: DataType.INTEGER
    })
    idCategoria: number;
    @BelongsTo(()=> Categoria)
    categoria: Categoria
   
    @ForeignKey(()=> UnidadDeMedida)
    @Column({
        type: DataType.INTEGER
    })
    idUnidadDeMedida: number;

    @BelongsTo(()=> UnidadDeMedida)
    unidadDeMedida: UnidadDeMedida
    
    @HasMany(()=> Cultivo)
    cultivos: Cultivo[];    

    @HasMany(()=> Campana)
    campanas: Campana[];

    @BelongsToMany(()=> Actividad, ()=> InsumoActividad)
    actividades: Actividad[];

    @HasMany(()=> Stock, {
        onDelete: 'CASCADE'
    })
    stocks: Stock[];

    @ForeignKey(()=> SemillaCategoria)
    @Column({
        type: DataType.INTEGER
    })
    idSemillaCategoria: number;

    @BelongsTo(()=> SemillaCategoria)
    semillaCategoria: SemillaCategoria;

    @HasMany(()=> Egreso)
    ingresos: Egreso[]
}
 