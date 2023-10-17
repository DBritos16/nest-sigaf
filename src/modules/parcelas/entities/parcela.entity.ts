import { Table, Model, PrimaryKey, Column, DataType, BelongsTo, ForeignKey, HasMany, AutoIncrement} from 'sequelize-typescript'
import { Cultivo } from 'src/modules/cultivos/entities/cultivo.entity';
import { Establecimiento } from 'src/modules/establecimientos/entities/establecimiento.entity';


@Table({
    tableName: 'parcelas'
})
export class Parcela extends Model{
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    idParcela: string;

    @AutoIncrement
    @Column
    nombre: number;

    @Column({
        type: DataType.ARRAY(DataType.ARRAY(DataType.FLOAT))
    })
    geoUbicacion: number[][][];
    
    @Column({
        type: DataType.ARRAY(DataType.FLOAT)
    })
    center: number[];

    @Column({
        type: DataType.FLOAT
    })
    area: number;

    @Column
    zoom: number;

    @Column({
        defaultValue: '#ffff'
    })
    color: string;

    @Column({
        defaultValue: false
    })
    enUso: boolean

    @BelongsTo(()=>Establecimiento)
    establecimiento: Establecimiento

    @ForeignKey(()=>Establecimiento)
    @Column({
        type: DataType.UUID
    })
    idEstablecimiento: string;


    @HasMany(()=> Cultivo, {
        onDelete: 'CASCADE'
    })
    cultivos: Cultivo[];
}
