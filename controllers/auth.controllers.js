const userModel = require('../models')

exports.signup = async (req, res, next) => {

   // const {user} = req.body;
    console.log(req.body.name)
    const { user, email, password, acceptTerm } = req.body;
    try {
 const user = await userModel.create({ email, password});
 res.status(201).json({user: user._id}) 
    }
 catch(err) {res.status(201).json({ err });} 

//////////////////////////////  est identique au précédent mais plus long
// const user = new userModel({
// email: req.body.email,
// password: req.body.password});
//       user
//         .save()
//         .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
//         .catch((error) => res.status(400).json({ error }));
};




exports.login = (req, res, next) => {};
