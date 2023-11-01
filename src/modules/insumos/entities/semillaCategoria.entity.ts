import { Table, Model, PrimaryKey, Column, DataType, HasMany, AutoIncrement } from 'sequelize-typescript';
import { Insumo } from './insumo.entity';


@Table({
    tableName: 'semillaCategoria',
})
export class SemillaCategoria extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    idSemillaCategoria: number;

    @Column
    nombre: string;

    @HasMany(()=> Insumo)
    insumos: Insumo[];
}