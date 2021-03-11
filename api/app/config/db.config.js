module.exports = {
  HOST: "localhost",
  USER: "nateadmin",
  PASSWORD: "123456",
  DB: "natedb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}