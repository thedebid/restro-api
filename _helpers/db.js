const config = require("./../config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};
initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { HOST, PORT, USER, PASSWORD, DB, dialect } = config.DATABASE;
  const connection = await mysql.createConnection({
    host: HOST,
    port: PORT,
    user: USER,
    password: PASSWORD,
  });
  //console.log(connection);
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB}\`;`);

  // connect to db
  const sequelize = new Sequelize(DB, USER, PASSWORD, {
    dialect: dialect,
  });

  // init models and add them to the exported db object
  db.User = require("../modules/user/user.model")(sequelize);
  //   db.RefreshToken = require("../accounts/refresh-token.model")(sequelize);
  db.Setting = require("./../modules/setting/setting.model")(sequelize);

  // db.Customer =
  const Customer = require("./../modules/customer/customer.model")(sequelize);
  //db.Order =
  const Order = require("./../modules/order/order.model")(sequelize);
  //define relationships
  //   db.Account.hasMany(db.RefreshToken, { onDelete: "CASCADE" });
  //   db.RefreshToken.belongsTo(db.Account);

  Customer.hasMany(Order, { onDelete: "CASCADE" });
  Order.belongsTo(Customer);

  db.Customer = Customer;
  db.Order = Order;

  // sync all models with database
  // await sequelize.sync({ force: true });
  await sequelize.sync();
}
