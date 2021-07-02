const { DataTypes } = require("sequelize");

module.exports = customerModel;

function customerModel(sequelize) {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },

    email: { type: DataTypes.STRING, allowNull: false },
  };
  return sequelize.define("customer", attributes);
}
