import { Sequelize } from 'sequelize-typescript';
import { Codigo } from 'src/auth/entities/codigo.entity';
import { Usuario } from 'src/auth/entities/usuario.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres'
      });
      sequelize.addModels([Usuario, Codigo]);
      await sequelize.sync({force: false});
      console.log('BD connected')
      return sequelize;
    },
  },
];