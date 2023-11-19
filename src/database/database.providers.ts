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
import { SemillaCategoria } from 'src/modules/insumos/entities/semillaCategoria.entity';
import { Venta } from 'src/modules/stock/entities/ventas.entity';
import { Egreso } from 'src/modules/contabilidad/entities/egreso.entity';
import { Ingreso } from 'src/modules/contabilidad/entities/ingreso.entity';

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
        SemillaCategoria,
        Cultivo, 
        Campana, 
        Actividad, 
        Empleado, 
        EmpleadoActividad, 
        InsumoActividad,
        Stock,
        Venta,
        Egreso,
        Ingreso
      ]);
      await sequelize.sync({force: false});

      await Categoria.findCreateFind({ where: { nombre: 'Semillas' } });
      await Categoria.findCreateFind({ where: { nombre: 'Fertilizantes' } });
      await Categoria.findCreateFind({ where: { nombre: 'Quimicos' } });
      await UnidadDeMedida.findCreateFind({where: {nombre: 'Kilogramos'}});
      await UnidadDeMedida.findCreateFind({where: {nombre: 'Bolsas'}});
      await SemillaCategoria.findCreateFind({where: {nombre: 'Frutas'}});
      await SemillaCategoria.findCreateFind({where: {nombre: 'Verduras'}});
      await SemillaCategoria.findCreateFind({where: {nombre: 'Cereales y Granos'}});
      await SemillaCategoria.findCreateFind({where: {nombre: 'Hierbass'}});

      
      console.log('BD connected')
      return sequelize;
    },
  },
];