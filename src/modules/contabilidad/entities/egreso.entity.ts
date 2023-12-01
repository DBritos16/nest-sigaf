import { Table, Model, PrimaryKey, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Establecimiento } from 'src/modules/establecimientos/entities/establecimiento.entity';
import { Insumo } from 'src/modules/insumos/entities/insumo.entity';

@Table({
    tableName: 'egresos',
})
export class Egreso extends Model {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    idEgreso: string;

    @Column({
        type: DataType.FLOAT
    })
    monto: number;

    @ForeignKey(()=> Insumo)
    @Column({
        type: DataType.UUID
    })
    idInsumo: string;

    @BelongsTo(()=> Insumo)
    insumo: Insumo;

    @ForeignKey(()=> Establecimiento)
    @Column({
        type: DataType.UUID
    })
    idEstablecimiento: string;

    @BelongsTo(()=> Establecimiento)
    establecimiento: Establecimiento
};


