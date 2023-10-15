import { Table, Model, PrimaryKey, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript'
import { Actividad } from 'src/modules/actividades/entities/actividad.entity';
import { Campana } from 'src/modules/campanas/entities/campana.entity';
import { Insumo } from 'src/modules/insumos/entities/insumo.entity';
import { Parcela } from 'src/modules/parcelas/entities/parcela.entity';

@Table({
    tableName: 'cultivos'
})
export class Cultivo extends Model {

    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    idCultivo: string;

    @Column({
        type: DataType.FLOAT
    })
    totalCultivado: number;

    @Column({
        defaultValue: false
    })
    cosechado: boolean;

    @ForeignKey(()=>Campana)
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    idCampana: string;
 
    @BelongsTo(()=>Campana)
    campana: Campana;

    @ForeignKey(()=> Parcela)
    @Column({
        type: DataType.UUID,
    })
    idParcela: string;

    @BelongsTo(()=>Parcela)
    parcela: Parcela;


    @ForeignKey(()=> Insumo)
    @Column({
        type: DataType.UUID,
    })
    idInsumo: string;

    @BelongsTo(()=>Insumo)
    insumo: Insumo;

    @HasMany(()=> Actividad)
    actividades: Actividad[];
}
