import { Table, Model, PrimaryKey, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Actividad } from './actividad.entity';
import { Insumo } from 'src/modules/insumos/entities/insumo.entity';

@Table({
    tableName: 'insumosActividad'
})
export class InsumoActividad extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    idInsumoActividad: string;

    @ForeignKey(()=> Actividad)
    @Column({
        type: DataType.UUID,
    })
    idActividad: string;
    
    @BelongsTo(()=>Actividad)
    actividad: Actividad;

    @ForeignKey(()=> Insumo)
    @Column({
        type: DataType.UUID,
    })
    idInsumo: string;

    @BelongsTo(()=> Insumo)
    insumo: Insumo;
}