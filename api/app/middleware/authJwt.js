const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
const db = require('../models')
const User = db.User

verifyToken = (req, res, next) => {
  console.log('verifying')
  let token = req.headers["x-access-token"]

  if (!token) {
    return res.status(403).send({
      message: "error: no token provided"
    })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "error: unauthorized"
      })
    }
    req.userId = decoded.id
    User.findOne({
      where: {
        id: req.userId
      }
    })
      .then(user => {
        req.email = user.email
        next()
      })
  })
}

const authJwt = {
  verifyToken: verifyToken
}

module.exports = authJwt