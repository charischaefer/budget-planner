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

// router.post("/login", async (req, res) => {

// });

// router.get("/logout", async (req, res) => {

// });

// router.get("/profile", async () => {

// });

module.exports = router;