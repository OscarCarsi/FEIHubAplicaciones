'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class credentials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  credentials.init({
    username:{
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      primaryKey: true
    },
    password:{
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING(30),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'credentials',
    timestamps: false,
    underscored: true, 
    freezeTableName: true
  });
  return credentials;
};