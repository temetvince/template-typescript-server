import { DataTypes } from 'sequelize';
import { DB } from '../database/db.js';

const db = await DB.get();

const Book = db.define('Book', {
   title: DataTypes.STRING,
   author: DataTypes.STRING,
});

await db.sync({ force: true });

export default Book;
