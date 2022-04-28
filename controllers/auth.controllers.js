const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')

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
        acceptTerm,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));

   

//     try {
//  const user = await userModel.create({ name, email, password, acceptTerm });
//  res.status(201).json({user: user._id}) 
//     }
//  catch(err) {res.status(201).json({ err });} 


};




exports.login = (req, res, next) => {};
