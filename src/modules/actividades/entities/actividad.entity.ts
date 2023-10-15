import { Table, Model, PrimaryKey, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Cultivo } from 'src/modules/cultivos/entities/cultivo.entity';


@Table({
    tableName: 'actividades'
})
export class Actividad extends Model {
    
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    idActividad: string;

    @Column
    titulo: string;

    @Column
    descripcion: string

    @Column
    fecha: Date

    @ForeignKey(()=> Cultivo)
    @Column({
        type: DataType.UUID,
    })
    idCultivo: string;
 
    @BelongsTo(()=>Cultivo)
    cultivo: Cultivo;
}
