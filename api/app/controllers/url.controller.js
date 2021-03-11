const db = require('../models')
const Url = db.urls

exports.createUrl = (req, res) => {
  console.log(req.body)
  Url.create({
    userId: req.userId,
    urlPath: req.body.urlPath
  })
    .then(() => {
      res.send({ message: "new url created" })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}