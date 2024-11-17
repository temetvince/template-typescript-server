import { DataTypes, Model } from 'sequelize';
import { DB } from '../db';

class User extends Model {
   public id!: number;
   public name!: string;
   public email!: string;
   public createdAt!: Date;
   public updatedAt!: Date;
}

const initUserModel = async () => {
   const sequelize = await DB.get();

   User.init(
      {
         id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
         },
      },
      {
         sequelize,
         tableName: 'users',
      },
   );

   await User.sync(); // Ensure table is created
};

export { User, initUserModel };
