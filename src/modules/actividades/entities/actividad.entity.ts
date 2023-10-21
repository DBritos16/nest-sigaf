import { Table, Model, PrimaryKey, Column, DataType, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Cultivo } from 'src/modules/cultivos/entities/cultivo.entity';
import { EmpleadoActividad } from './empleadoActividad.entity';
import { InsumoActividad } from './insumoActividad.entity';
import { Insumo } from 'src/modules/insumos/entities/insumo.entity';
import { Empleado } from 'src/modules/empleados/entities/empleado.entity';


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

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    fecha: Date

    @ForeignKey(()=> Cultivo)
    @Column({
        type: DataType.UUID,
    })
    idCultivo: string;
 
    @BelongsTo(()=>Cultivo)
    cultivo: Cultivo;

    @BelongsToMany(()=> Insumo, ()=> InsumoActividad)
    insumos: Insumo[];

    @BelongsToMany(()=> Empleado, ()=> EmpleadoActividad)
    empleados: Empleado[];
}
