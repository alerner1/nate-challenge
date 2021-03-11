module.exports = (sequelize, Sequelize) => {
  const Url = sequelize.define("urls", {
    urlPath: {
      type: Sequelize.STRING
    }
  })
  return Url
}
