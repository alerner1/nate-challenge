const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
const db = require('../models')
const User = db.user

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
    req.email = decoded.email
    next()
  })
}

const authJwt = {
  verifyToken: verifyToken
}

module.exports = authJwt