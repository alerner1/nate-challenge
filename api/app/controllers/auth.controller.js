const db = require('../models')
const config = require('../config/auth.config')
const User = db.User

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(() => {
      res.json({ message: "user created" })
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "error: user not found" })
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          message: "error: invalid password"
        })
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400
      })

      return res.status(200).json({
        id: user.id,
        email: user.email,
        accessToken: token
      })
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
}

exports.getUser = (req, res) => {
  return res.status(200).json({id: req.userId, email: req.email})
}