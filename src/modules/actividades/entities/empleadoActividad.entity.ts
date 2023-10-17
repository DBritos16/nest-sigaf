import { Table, Model, PrimaryKey, Column, DataType, ForeignKey } from 'sequelize-typescript'
import { Actividad } from './actividad.entity';
import { Empleado } from 'src/modules/empleados/entities/empleado.entity';

@Table({
    tableName: 'empleadoActividad'
})
export class EmpleadoActividad extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    idEmpleadoActividad: string;

}