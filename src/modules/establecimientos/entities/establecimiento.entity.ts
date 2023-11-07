import { Table, Model, DataType, PrimaryKey, Column, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript'
import { Campana } from 'src/modules/campanas/entities/campana.entity';
import { Empleado } from 'src/modules/empleados/entities/empleado.entity';
import { Insumo } from 'src/modules/insumos/entities/insumo.entity';
import { Parcela } from 'src/modules/parcelas/entities/parcela.entity';
import { Stock } from 'src/modules/stock/entities/stock.entity';
import { Venta } from 'src/modules/stock/entities/ventas.entity';
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

    @HasMany(()=> Parcela, {
        onDelete: 'CASCADE'
    })
    parcelas: Parcela[]

    @HasMany(()=> Campana)
    campanas: Campana[]

    @HasMany(()=>Empleado, {
        onDelete: 'CASCADE'
    })
    empleados: Empleado[]

    @HasMany(()=> Insumo, {
        onDelete: 'CASCADE'
    })
    insumos: Insumo[]

    @HasMany(()=> Stock, {
        onDelete: 'CASCADE'
    })
    stock: Stock[]

    @HasMany(()=> Venta, {
        onDelete: 'CASCADE'
    })
    ventas: Venta[]
}
