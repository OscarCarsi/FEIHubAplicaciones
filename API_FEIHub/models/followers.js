'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class followers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  followers.init({
    follower:{
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      primaryKey: true,
      references: {
        model: 'credentials',
        key: 'username',
        UPDATE: 'CASCADE'
      }
    },
    following: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'credentials',
        key: 'username',
        UPDATE: 'CASCADE'
      }
    }
  }, {
    sequelize,
    modelName: 'followers',
    timestamps: false
  });
  return followers;
};