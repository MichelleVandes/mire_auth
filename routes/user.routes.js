const router = require("express").Router();
const authController = require('../controllers/auth.controllers')

router.post('/signup', authController.signup)

module.exports = router; 

// app.post("/api/login", (req, res) => {
//   if (!req.password) {
//     res.status(401).send("mot passe requis");
//     return;
//   }
// });

// app.post("/api/login", (req, res) => {
//   if (!req.email && !req.name) {
//     res.status(401).send("identifiant invalide");
//     return;
//   }
// });

// app.get("/", (req, res) => {
//   res.send(req.user);
//   return;
// });
