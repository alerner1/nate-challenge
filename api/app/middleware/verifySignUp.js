const db = require("../models")
const User = db.User

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        error: "email exists"
      })
      return 
    } 
    next()
  })
}

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail
}

module.exports = verifySignUp