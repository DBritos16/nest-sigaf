import { Table, Model, PrimaryKey, Column, DataType, AutoIncrement, HasMany} from 'sequelize-typescript'
import { Insumo } from './insumo.entity';

@Table({
    tableName: 'unidadDeMedida'
})
export class UnidadDeMedida extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'idUnidadDeMedida'
    })
    idUnidadDeMedida: number;

    @Column
    nombre: string;

    @HasMany(()=> Insumo) 
    insumos: Insumo[]
}
