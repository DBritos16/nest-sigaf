import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Empresa } from "./empresa.entity";

@Table({
    tableName: 'usuarios'
})
export class Usuario extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        field: 'idUsuario'
    })
    idUsuario: String

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

    @HasMany(()=> Empresa)
    empresas: Empresa[];
}
