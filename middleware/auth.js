const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log('token',token)

  if (!token) {
    return res.status(401).send("echec d'autentification");
  }
  let key = process.env.PRIVATE_KEY;
  jwt.verify(token, key, (err, dataToken) => {
    if (err) {console.log(dataToken);
     return res.status(401).send("token invalide");
    }
    req.user = dataToken;
    console.log(req);
    next();
  });
}
