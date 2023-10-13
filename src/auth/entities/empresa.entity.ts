import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Usuario } from "./usuario.entity";

@Table({
    tableName: 'empresas'
})
export class Empresa extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        field: 'idEmpresa'
    })
    idEmpresa: string

    @Column
    nombre: string

    @ForeignKey(() => Usuario) 
    @Column({ 
        type: DataType.UUID,
        field: 'idDueño'
    }) 
    idDueño: string;

    @BelongsTo(() => Usuario)
    usuario: Usuario;
}