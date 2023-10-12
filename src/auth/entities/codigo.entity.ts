import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table({
    tableName: 'codigos'
})

export class Codigo extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
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
