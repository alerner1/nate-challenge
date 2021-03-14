const db = require('../models')
const rp = require ('request-promise')
const JSSoup = require("jssoup").default
const _ = require('lodash')
const Url = db.urls

exports.createUrl = (req, res) => {
  Url.findOne({
    where: {
      userId: req.userId,
      urlPath: req.body.urlPath
    }
  })
    .then(url => {
      if (!url) {
        Url.create({
          userId: req.userId,
          urlPath: req.body.urlPath
        })
          .catch(err => {
            res.status(500).send({ message: err.message })
          })
      }
      rp(req.body.urlPath)
        .then(html => {
          const soup = new JSSoup(html)
          const text = soup.text
          result = processText(text)
          res.status(200).send({ result })
        })
    })
}

const processText = (text) => {
  const lowerCaseText = _.lowerCase(text)
  const words = _.words(lowerCaseText)
  const frequency = {}
  for (let word of words) {
    if (!(word in frequency)) {
      frequency[word] = 1
    } else {
      frequency[word] += 1
    }
  }

  return frequency

  // to get the sorted object:
  // return Object.entries(frequency).sort((a, b) => b[1] - a[1])
}