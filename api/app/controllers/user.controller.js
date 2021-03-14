exports.allAccess = (req, res) => {
  res.status(200).json({result: "public content"})
}

exports.userAccess = (req, res) => {
  res.status(200).json({result: "user content"})
}


exports.userAccess2 = (req, res) => {
  res.status(200).json({result: "user content"})
}