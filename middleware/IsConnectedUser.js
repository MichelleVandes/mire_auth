const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");

require("dotenv").config();

function connectedUser(password, userPassword, idConnexion) {
  console.log("top 1", password, userPassword, idConnexion);
  bcrypt
    .compare(password, userPassword)
    .then((passwordValid) => {
      if (!passwordValid) {
        return res.status(401).json({ error: "Mot de passe incorrect !!!" });
      }
      // Mot de passe OK, création du token :
      var token = jwt.sign(
        { "idConnexion: ": idConnexion },
        process.env.PRIVATE_KEY
      );

      res.status(200).json({ "identifiant: ": userIdentifiant, token });
    })
    .catch((error) => {
      res.status(500).json({ error: "impossible décrypter mot de passe" });
    });
}

module.exports = connectedUser;
