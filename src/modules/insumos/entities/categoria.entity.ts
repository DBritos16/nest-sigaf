import { Table, Model, PrimaryKey, Column, DataType, AutoIncrement, HasMany} from 'sequelize-typescript'
import { Insumo } from './insumo.entity';

@Table({
    tableName: 'categorias'
})
export class Categoria extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        field: 'idCategoria'
    })
    idCategoria: number;

    @Column
    nombre: string;

    @HasMany(()=> Insumo) 
    insumos: Insumo[]
}
