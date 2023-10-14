import { Sequelize } from 'sequelize-typescript';
import { Codigo } from 'src/usuarios/entities/codigo.entity';
import { Empresa } from 'src/usuarios/entities/empresa.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Establecimiento } from 'src/establecimientos/entities/establecimiento.entity';
import { Parcela } from 'src/parcelas/entities/parcela.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres'
      });
      sequelize.addModels([Usuario, Codigo, Empresa, Establecimiento, Parcela]);
      await sequelize.sync({force: false});
      console.log('BD connected')
      return sequelize;
    },
  },
];