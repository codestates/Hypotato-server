"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class potato extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      potato.belongsTo(models.field, {
        foreignKey: {
          allowNull: true,
        },
      });
      potato.belongsTo(models.user, {
        foreignKey: {
          allowNull: true,
        },
      });
    }
  }
  potato.init(
    {
      potatoName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      potatoDesc: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: "good",
      },
      fieldId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "potato",
    }
  );
  return potato;
};
