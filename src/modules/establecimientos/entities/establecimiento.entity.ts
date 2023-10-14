import { Table, Model, DataType, PrimaryKey, Column, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript'
import { Parcela } from 'src/modules/parcelas/entities/parcela.entity';
import { Empresa } from 'src/modules/usuarios/entities/empresa.entity';

@Table({
    tableName: 'establecimientos'
})
export class Establecimiento extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        field: 'idEstablecimiento'
    })
    idEstablecimiento: string

    @Column
    nombre: string;
    
    @Column
    provincia: string;
    
    @Column
    departamento: string;
    
    @Column
    localidad: string;
    
    @Column({
        type: DataType.ARRAY(DataType.ARRAY(DataType.FLOAT))
    })
    geoUbicacion: number[][][];
    
    @Column({
        type: DataType.ARRAY(DataType.FLOAT)
    })
    center: number[];

    @Column({
        type: DataType.FLOAT
    })
    area: number;

    @Column
    zoom: number;

    @ForeignKey(() => Empresa) 
    @Column({ 
        type: DataType.UUID
    }) 
    idEmpresa: string;

    @BelongsTo(()=>Empresa)
    empresa: Empresa

    @HasMany(()=> Parcela)
    parcelas: Parcela[]
}
