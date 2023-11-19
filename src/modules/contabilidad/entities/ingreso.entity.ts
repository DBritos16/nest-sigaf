import { Table, Model, PrimaryKey, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Establecimiento } from 'src/modules/establecimientos/entities/establecimiento.entity';
import { Venta } from 'src/modules/stock/entities/ventas.entity';

@Table({
    tableName: 'ingresos',
})
export class Ingreso extends Model {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    idIngreso: string;


    @ForeignKey(()=> Venta)
    @Column({
        type: DataType.UUID
    })
    idVenta: string;

    @BelongsTo(()=> Venta)
    venta: Venta

    @ForeignKey(()=> Establecimiento)
    @Column({
        type: DataType.UUID
    })
    idEstablecimiento: string;

    @BelongsTo(()=> Establecimiento)
    establecimiento: Establecimiento
};


