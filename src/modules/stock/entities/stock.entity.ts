import { Table, Model, PrimaryKey, Column, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { Establecimiento } from 'src/modules/establecimientos/entities/establecimiento.entity';
import { Insumo } from 'src/modules/insumos/entities/insumo.entity';
import { Venta } from './ventas.entity';

@Table({
    tableName: 'stock'
})
export class Stock extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    
    })
    @Column
    idStock: string;
    
    @Column({
        type: DataType.FLOAT
    })
    stock: number;
    
    @Column({
        type: DataType.FLOAT,
        defaultValue: 0
    })
    vendidos: number;

    @ForeignKey(()=> Insumo)
    @Column({
        type: DataType.UUID
    })
    idInsumo: string;

    @BelongsTo(()=> Insumo)
    insumo: Insumo

    @ForeignKey(()=> Establecimiento)
    @Column({
        type: DataType.UUID
    })
    idEstablecimiento: string;

    @BelongsTo(()=> Establecimiento)
    establecimiento: Establecimiento

    @HasMany(()=> Venta, {
        onDelete: 'CASCADE'
    })
    ventas: Venta[]
}
