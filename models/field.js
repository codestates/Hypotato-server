"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      field.belongsTo(models.user, {
        foreignKey: {
          allowNull: true,
        },
      });

      field.hasMany(models.potato, {
        foreignKey: "fieldId",
      });
    }
  }
  field.init(
    {
      category: DataTypes.STRING,
      fieldName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fieldDesc: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "field",
    }
  );
  return field;
};
