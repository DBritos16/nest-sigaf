import { Table, Model, PrimaryKey, Column, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { Stock } from './stock.entity';
import { Establecimiento } from 'src/modules/establecimientos/entities/establecimiento.entity';

@Table({
    tableName: 'ventas'
})
export class Venta extends Model {
    
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    idVenta: string;

    @Column({
        type: DataType.FLOAT
    })
    cantidad: number;


    @Column({
        type: DataType.FLOAT
    })
    precio: number;

    @Column({
        defaultValue: true
    })
    isActive: boolean

    @ForeignKey(()=> Stock)
    @Column({
        type: DataType.UUID
    })
    idStock: string;

    @BelongsTo(()=> Stock)
    stock: Stock


    @ForeignKey(()=> Establecimiento)
    @Column({
        type: DataType.UUID
    })
    idEstablecimiento: string;

    @BelongsTo(()=> Establecimiento)
    establecimiento: Establecimiento
}