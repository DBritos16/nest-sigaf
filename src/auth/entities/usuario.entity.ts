import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'usuarios'
})
export class Usuario extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'idUsuario'
    })
    idUsuario: number

    @Column
    nombre: string
    
    @Column
    apellido: string
    
    @Column
    cuil: string
    
    @Column({
        defaultValue: 'productor'
    })
    rol: string

    @Column
    correo: string;

    @Column
    password: string;
}
