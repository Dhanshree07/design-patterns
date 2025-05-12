import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
} = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST) {
  throw new Error('Missing required environment variables for DB connection');
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;

if (require.main === module) {
  sequelize.authenticate()
    .then(() => {
      console.log('✅ Connection to MySQL has been established successfully.', DB_NAME);
    })
    .catch(err => {
      console.error('❌ Unable to connect to the database:', err);
    });
}
