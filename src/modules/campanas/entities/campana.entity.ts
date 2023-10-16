import { Table, Model, PrimaryKey, Column, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Cultivo } from 'src/modules/cultivos/entities/cultivo.entity';
import { Insumo } from 'src/modules/insumos/entities/insumo.entity';

@Table({
    tableName: 'campanas'
})
export class Campana extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    idCampana: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    inicio: Date;

    @Column
    final: Date;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    isActive: boolean;

    @HasMany(()=>Cultivo)
    cultivos: Cultivo[];


    @ForeignKey(()=> Insumo)
    @Column({ 
        type: DataType.UUID,
    })
    idInsumo: string;

    @BelongsTo(()=>Insumo)
    insumo: Insumo;
}
