import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table({
    tableName: 'codigos'
})

export class Codigo extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        field: 'idCodigo'
    })
    idCodigo: number;

    @Column
    key: string;

    @Column
    codigo: string;

    @Column
    correo: string;
}
