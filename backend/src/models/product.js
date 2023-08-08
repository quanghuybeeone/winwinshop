'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    id_cate: DataTypes.INTEGER,
    prd_name: DataTypes.STRING,
    prd_img_1: DataTypes.STRING,
    prd_img_2: DataTypes.STRING,
    prd_img_3: DataTypes.STRING,
    prd_img_4: DataTypes.STRING,
    description: DataTypes.STRING,
    prd_price: DataTypes.DOUBLE,
    amount: DataTypes.INTEGER,
    view: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};