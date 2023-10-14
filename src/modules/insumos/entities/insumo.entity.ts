import { Table, Model, PrimaryKey, Column, DataType, BelongsTo, ForeignKey} from 'sequelize-typescript'
import { Establecimiento } from 'src/modules/establecimientos/entities/establecimiento.entity';
import { Categoria } from './categoria.entity';
import { UnidadDeMedida } from './unidadDeMedida.entity';

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
}
 