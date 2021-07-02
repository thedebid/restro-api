const { DataTypes } = require("sequelize");

module.exports = orderModel;

function orderModel(sequelize) {
  const attributes = {
    quantity: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
  };
  return sequelize.define("order", attributes);
}
