import { Table, Model, DataType, PrimaryKey, Column, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Empresa } from 'src/usuarios/entities/empresa.entity';

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

    @Column
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
}
