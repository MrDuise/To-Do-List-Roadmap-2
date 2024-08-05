import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import User from './Users'; // Ensure this path is correct

interface TaskAttributes {
  id: number;
  name: string;
  description: string;
  status: boolean;
  userID: number;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public status!: boolean;
  public userID!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate() {
    Task.belongsTo(User, {
      foreignKey: 'userID',
      as: 'user',
    });
  }
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users', // name of the target table
        key: 'id',      // key in the target table that the foreign key refers to
      },
    },
  },
  {
    sequelize,
    tableName: 'tasks',
    timestamps: false, // Disable timestamps
  }
);

export default Task;

