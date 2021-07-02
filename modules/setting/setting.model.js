const { DataTypes } = require("sequelize");

module.exports = settingModel;

function settingModel(sequelize) {
  const attributes = {
    option_name: { type: DataTypes.STRING, allowNull: false },

    option_value: { type: DataTypes.STRING, allowNull: false },
  };
  return sequelize.define("setting", attributes);
}
