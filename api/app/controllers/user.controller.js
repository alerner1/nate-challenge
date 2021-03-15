const db = require('../models')
const Url = db.Url

exports.userUrls = (req, res) => {
  Url.findAll({ where: {userId: req.userId}})
    .then(userUrls => {
      res.status(200).json({urls: userUrls})
    })
}