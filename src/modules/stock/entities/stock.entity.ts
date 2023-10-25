import { Table, Model, PrimaryKey, Column, DataType} from 'sequelize-typescript';

@Table({
    tableName: 'stock'
})
export class Stock extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    
    })
    @Column
    idStock: string;
    
    @Column({
        type: DataType.FLOAT
    })
    stock: number;
    
    @Column({
        type: DataType.FLOAT,
        defaultValue: 0
    })
    vendidos: number;
}
