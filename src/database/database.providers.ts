import { Sequelize } from 'sequelize-typescript';
import { Codigo } from 'src/modules/usuarios/entities/codigo.entity';
import { Empresa } from 'src/modules/usuarios/entities/empresa.entity';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { Establecimiento } from 'src/modules/establecimientos/entities/establecimiento.entity';
import { Parcela } from 'src/modules/parcelas/entities/parcela.entity';
import { Insumo } from 'src/modules/insumos/entities/insumo.entity';
import { Categoria } from 'src/modules/insumos/entities/categoria.entity';
import { UnidadDeMedida } from 'src/modules/insumos/entities/unidadDeMedida.entity';
import { Cultivo } from 'src/modules/cultivos/entities/cultivo.entity';
import { Campana } from 'src/modules/campanas/entities/campana.entity';
import { Actividad } from 'src/modules/actividades/entities/actividad.entity';
import { Empleado } from 'src/modules/empleados/entities/empleado.entity';
import { EmpleadoActividad } from 'src/modules/actividades/entities/empleadoActividad.entity';
import { InsumoActividad } from 'src/modules/actividades/entities/insumoActividad.entity';
import { Stock } from 'src/modules/stock/entities/stock.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => { 
      const sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres'
      });
      sequelize.addModels([
        Usuario, 
        Codigo, 
        Empresa, 
        Establecimiento, 
        Parcela, 
        Insumo, 
        Categoria, 
        UnidadDeMedida, 
        Cultivo, 
        Campana, 
        Actividad, 
        Empleado, 
        EmpleadoActividad, 
        InsumoActividad,
        Stock
      ]);
      await sequelize.sync({force: false});
      console.log('BD connected')
      return sequelize;
    },
  },
];