import { IUser } from "@/types/schema";
import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

class User extends Model implements IUser {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public emailAddress!: string;
  public phoneNumber?: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.STRING,
          defaultValue: UUIDV4,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        emailAddress: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "users",
        timestamps: true,
        underscored: true,
      }
    );
  }

  public static associate() {}
}

export default User;
