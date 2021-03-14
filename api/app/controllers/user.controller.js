const db = require('../models')
const config = require('../config/auth.config')
const Url = db.urls

exports.allAccess = (req, res) => {
  res.status(200).json({result: "public content"})
}

exports.userAccess = (req, res) => {
  res.status(200).json({result: "user content"})
}

exports.userUrls = (req, res) => {
  Url.findAll({ where: {userId: req.userId}})
    .then(userUrls => {
      res.status(200).json({urls: userUrls})
    })
}