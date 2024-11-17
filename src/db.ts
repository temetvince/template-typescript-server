import { Sequelize } from 'sequelize';

/**
 * The DB class is a singleton class that provides access to the database.
 * Only one instance of DB can be created and accessed through the static `get` method.
 * It ensures that a single database connection is used in the application.
 */
export class DB {
   private static instance: database;

   private constructor() {}

   /**
    * Retrieves the database instance.
    *
    * @returns The database instance.
    * @throws {Error} If the database connection fails.
    */
   public static async get() {
      if (!DB.instance) {
         DB.instance = new database('./dist/database.db');
      }

      const db = await DB.instance.getDb();

      if (db) {
         return db;
      } else {
         throw new Error('Failed to establish a database connection.');
      }
   }
}

/**
 * A class representing a database connection.
 */
class database {
   private db: Sequelize | undefined;
   private readonly path: string;

   constructor(path: string) {
      this.path = path;
   }

   /**
    * Lazy loads the database instance.
    *
    * @async
    * @function getDb
    * @returns {Promise} - A promise that resolves to the database instance.
    */
   public getDb = async (): Promise<Sequelize> => {
      if (this.db) {
         return this.db;
      } else {
         return new Sequelize({
            dialect: 'sqlite',
            storage: this.path,
         });
      }
   };
}
