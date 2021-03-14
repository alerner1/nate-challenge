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
            res.status(500).json({ message: err.message })
          })
      }
      rp(req.body.urlPath)
        .then(html => {
          const soup = new JSSoup(html)
          const text = soup.text
          result = processText(text)
          res.status(200).json({ result: result })
        })
    })
}

const processText = (text) => {
  const lowerCaseText = _.lowerCase(text)
  const words = _.words(lowerCaseText)

  // using a map here to guarantee preservation of insertion order
  const frequency = new Map()
  for (let word of words) {
    if (!(frequency.has(word))) {
      frequency.set(word, 1)
    } else {
      frequency.set(word, frequency.get(word) + 1)
    }
  }

  return frequency

  // to get the sorted object:
  // return Object.entries(frequency).sort((a, b) => b[1] - a[1])
}