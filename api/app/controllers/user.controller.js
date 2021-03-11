exports.allAccess = (req, res) => {
  res.status(200).send("public content")
}

exports.userAccess = (req, res) => {
  res.status(200).send("user content")
}