import { Table, Model, PrimaryKey, Column, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { Stock } from './stock.entity';

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

    @ForeignKey(()=> Stock)
    @Column({
        type: DataType.UUID
    })
    idStock: string;

    @BelongsTo(()=> Stock)
    stock: Stock
}