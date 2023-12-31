import { Table, Model, PrimaryKey, Column, DataType, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Actividad } from 'src/modules/actividades/entities/actividad.entity';
import { EmpleadoActividad } from 'src/modules/actividades/entities/empleadoActividad.entity';
import { Establecimiento } from 'src/modules/establecimientos/entities/establecimiento.entity';

@Table({
    tableName: 'empleados'
})
export class Empleado extends Model {

    @PrimaryKey
    @Column({
        type: DataType.UUID, 
        defaultValue: DataType.UUIDV4
    })
    idEmpleado: string;

    @Column
    nombre: string

    @Column
    apellido: string;

    @Column
    dni: string;
    
    @Column
    imagen: string;

    @Column
    imagenId: string;

    @Column({
        defaultValue: 'empleado'
    }) 
    rol: string;

    @Column
    correo: string;

    @Column
    password: string;

    @ForeignKey(()=> Establecimiento)
    @Column({
        type: DataType.UUID
    })
    idEstablecimiento: string;

    @BelongsTo(()=> Establecimiento)
    establecimiento: Establecimiento;

    @BelongsToMany(()=> Actividad, ()=> EmpleadoActividad)
    actividades: Actividad[];
    
}
