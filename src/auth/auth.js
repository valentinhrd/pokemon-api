const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if(!authorizationHeader) {
    const message = `Invalid token.`
    return res.status(401).json({ message })
  }
  
  const token = authorizationHeader.split(' ')[1]
  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if(error) {
      const message = `Forbidden access.`
      return res.status(401).json({ message, data: error })
    }

    const userId = decodedToken.userId

    if (req.body.userId && req.body.userId !== userId) {
      const message = `Invalid User ID.`
      res.status(401).json({ message })
    } else {
      next()
    }
  })
}