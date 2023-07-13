const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log("authHeader:",authHeader)
    if( token == null) return res.sendStatus(401)
  
    jwt.verify(token, 'a25dc5668b9a1b8b6c4729680b64401aef61f27156bfce37676a5df001b6b5b348794a9dbac3329fa914b31574eddfdcf641f9a332e5bf4241e08721fe37834e',(err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

  module.exports = authenticateToken;