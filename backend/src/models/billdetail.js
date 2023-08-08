'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BillDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BillDetail.init({
    id_bill: DataTypes.STRING,
    id_prd: DataTypes.INTEGER,
    prd_name: DataTypes.STRING,
    prd_img: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    quanlity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'BillDetail',
  });
  return BillDetail;
};