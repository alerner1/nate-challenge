const config = require("../config/db.config.js");

const Sequelize = require("sequelize")
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require("./user.model.js")(sequelize, Sequelize)
db.urls = require("./url.model.js")(sequelize, Sequelize)

db.users.hasMany(db.urls, { as: "urls" })
db.urls.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user"
})

module.exports = db