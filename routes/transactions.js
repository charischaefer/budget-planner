var express = require('express');
var router = express.Router();
var db = require("../model/helper.js");
require("dotenv").config();
var bcrypt = require("bcrypt");


const userShouldBeLoggedIn = require("../guards/UserShouldBeLoggedIn.js")


// Get all transactions
router.get('/transactions', userShouldBeLoggedIn, async (req, res) => {
  const userId = (req.user_id);
      try {
      const transactions = await db(`SELECT * FROM transactions WHERE id = ${userId}`);
      res.send(transactions.data); 
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  
  // Get transaction by ID
  router.get('/transactions/:id', userShouldBeLoggedIn, async (req, res) => {
    const transactionId = (req.params.id);
    try {
      const transaction = await db(`SELECT * FROM transactions WHERE id = ${transactionId}`);
      console.log(transaction);
      if (transaction.data.length >= 1) {
        res.send(transaction.data); // Use res.send() to send the response
      } else {
        res.status(404).send({ error: "Transaction not found" });
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  
  // Create a new transaction
  router.post('/transactions', userShouldBeLoggedIn, async (req, res) => {
const { amount, date, source, category_id } = req.body;
const type = amount > 0 ? 'income' : 'expense'
    try {
      // Insert the new transaction into the database
      const result = await db(`INSERT INTO transactions (amount, date, source, type, category_id, user_id)
      VALUES (${amount}, '${date}', '${source}', '${type}', ${category_id}, ${req.user_id})`)
      // console.log('console log'+result);
      //const insertedTransaction = await db(`SELECT * FROM transactions WHERE id = ${result.id}`);

      res.status(201).send({messsage: 'Transaction added' }); 

    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
  

  // Update a transaction by ID
  router.put('/transactions/:id', userShouldBeLoggedIn, async (req, res) => {
    const transactionId = req.params.id;
    const {amount, date, source, type} = req.body;
    try {
      const result = await db(`UPDATE transactions SET amount = ${amount}, date = '${date}', source = '${source}', type = '${type}' WHERE id = ${transactionId}`);
      if (result.data.length <= 1) {
        //const updatedTransaction = await db(`UPDATE transactions SET amount = ${amount}, date = '${date}', source = '${source}', type = '${type}' WHERE id = transactionId`);
        
      res.status(201).send({ message: 'success'}); 
      } else {
        res.status(404).send({ error: "Transaction not found" });
      }
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
  
  // Delete a transaction by ID
  router.delete('/transactions/:id', userShouldBeLoggedIn, async (req, res, next) =>{
    let { id } = req.params;
    try {
      
      let results = await db(`SELECT * FROM transactions WHERE id = ${id}`);
      if (results.data.length === 0) {
        res.status(404).send({ error: "Transaction not found"}); 
      } else {
        //delete
        await db(`DELETE FROM transactions WHERE id = ${id}`);
      // Return updated lists
      let results = await db(`SELECT * FROM transactions`);
      res.send(results.data);;
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({ error: err.message });
    }
  });
  
module.exports = router;