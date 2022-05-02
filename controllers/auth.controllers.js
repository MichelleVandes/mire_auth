const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.signup = async (req, res, next) => {
 // récup des données dans body
    const { pseudo, email, password, acceptTerm } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new userModel({
        pseudo,
        email,
        password: hash,
        acceptTerm
          });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {

  const { idConnexion, password } = req.body;
  if (idConnexion == null) {
    res.status(401).send("Saisir identifiant");
    return;
  }
  if (password == null) {
    res.status(401).send("Mot de passe obligatoire");
    return;
  }


  userModel
    .findOne({ email: idConnexion })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "email non trouvé" });
      }

      // Identifiant trouvé, vérification du mot de passe :
       const userPassword = user.password;
       const userPseudo = user.pseudo;
   
      /////////////////////////////////////////////////
        bcrypt
          .compare(password, userPassword)
          .then((passwordValid) => {
            if (!passwordValid) {
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !!!" });
            }
            // Mot de passe OK, création du token :
          let key = process.env.PRIVATE_KEY;
          const data = { "idConnexion: ": idConnexion};           
          const token = jwt.sign(data, key, {
            expiresIn: "1800s",
          });

            res.status(200).json({ user, token, key });
          })
          .catch((error) => {
            res
              .status(500)
              .json({ error: "impossible décrypter mot de passe" });
          });
    })

    .catch((err) => {
      res.status(401).send("Erreur Serveur");
      return;
    });
};


exports.update = (req, res, next) => {
  userModel
    .updateOne({ _id: req.params }, { ...req.body, _id: req.params })
    .then(() => res.status(200).json({ message: `Utilisateur modifié !` }))
    .catch((error) => res.status(400).json({ error }));
};

