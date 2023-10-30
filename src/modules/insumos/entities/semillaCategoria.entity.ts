import { Table, Model, PrimaryKey, Column, DataType, HasMany } from 'sequelize-typescript';
import { Insumo } from './insumo.entity';


@Table({
    tableName: 'semillaCategoria',
})
export class SemillaCategoria extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    idSemillaCategoria: string;

    @Column
    nombre: string;

    @HasMany(()=> Insumo)
    insumos: Insumo[];
}