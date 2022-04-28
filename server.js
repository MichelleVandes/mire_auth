const express = require("express");
const userRoutes = require("./routes/user.routes")
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();
require('./connectDb')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))



// middleware

// routes 
app.use("/api/user" , userRoutes)


// Message d'erreur si aucun middleware n'a été enclanché précédement
app.use((req, res) => {
  console.log(req.url, req.body)
  res.status(404);
  res.json({
    error: "oups,Page not found",
  });
});

// connection server
app.listen(process.env.PORT, () => {
  console.log("le serveur est lancé sur le port :", process.env.PORT);
});