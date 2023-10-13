import { Sequelize } from 'sequelize-typescript';
import { Codigo } from 'src/auth/entities/codigo.entity';
import { Empresa } from 'src/auth/entities/empresa.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Establecimiento } from 'src/establecimientos/entities/establecimiento.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres'
      });
      sequelize.addModels([Usuario, Codigo, Empresa, Establecimiento]);
      await sequelize.sync({force: true});
      console.log('BD connected')
      return sequelize;
    },
  },
];