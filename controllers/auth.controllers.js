const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.signup = async (req, res, next) => {
  // récup des données dans body
  const { pseudo, email, password, acceptTerm } = req.body;
 console.log(req.body);
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new userModel({
        pseudo,
        email,
        password: hash,
        acceptTerm
      });

      console.log(user)
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
      console.log("top1  ", user);
      if (!user) {
        return res.status(400).json({ error: "email non trouvé" });
      }
   console.log(`top3`, password, user.password, idConnexion);

      // Identifiant trouvé, vérification du mot de passe :
       const userPassword = user.password;
       const userPseudo = user.pseudo;
      connectedUser(password, user.password, idConnexion);
      /////////////////////////////////////////////////
      const passwordValid = "";

    
        bcrypt
          .compare(password, userPassword)
          .then((passwordValid) => {
            if (!passwordValid) {
              return res
                .status(401)
                .json({ error: "Mot de passe incorrect !!!" });
            }
            // Mot de passe OK, création du token :
                        var token = jwt.sign(
                          { "idConnexion: ": idConnexion },
                          process.env.PRIVATE_KEY
                        );

            res.status(200).json({ "pseudo: ": userPseudo, token });
          })
          .catch((error) => {
            console.log(`top5`);
            res
              .status(500)
              .json({ error: "impossible décrypter mot de passe" });
          });
      /////////////////////////////////////////////////
    })

    .catch((err) => {
      res.status(401).send("Erreur Serveur");
      return;
    });
};

function connectedUser(password, userPassword, idConnexion) {
 
      
        }
    
