var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var db = require("../model/helper.js");
require("dotenv").config();
var bcrypt = require("bcrypt");

const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await db("SELECT * FROM users");

    res.send(users.data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// Register new user
router.post("/register", async (req, res) => {
  const { username, password, firstname, lastname, email, image } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await db(
      `INSERT INTO users (username, password, firstname, lastname, email, image)
      VALUES ("${username}", "${hash}", "${firstname}", "${lastname}", "${email}", "${image}")`
    );

    res.send({ message: "Register successful!" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password, firstname, lastname, email, image } = req.body;

  try{
    //select the user from the database based on username
    const results = await db(
      `SELECT * FROM users where username = "${username}"`
    );
    //store it in a variable
    const user = results.data[0];
    //if the user exists
    if (user){
      //store the user id in a variable
      const user_id = user.id;

    //compare the password from the request  with the password from the database using bcrypt
      const correctPassword = await bcrypt.compare(password, user.password); //returns true or false

    //if the password is not correct, throw an error
      if (!correctPassword) throw new Error("Incorrect password");

    //if its all good, create a token and add the user id to it in the payload object
      var token = jwt.sign({ user_id }, supersecret);
    //send the token to the client
      res.send({ message: "Login successful, here is your token", token});
    } else {
      throw new Error("User does not exist");
    } 
  }catch (err){
      res.status(400).send({ message: err.message});
    }
});

// router.get("/logout", async (req, res) => {

// });

// router.get("/profile", async () => {

// });

module.exports = router;