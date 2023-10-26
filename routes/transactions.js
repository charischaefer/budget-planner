var express = require('express');
var router = express.Router();
var db = require("../model/helper.js");
require("dotenv").config();
var bcrypt = require("bcrypt");

const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn.jsx")


// Get all transactions
router.get('/transactions', userShouldBeLoggedIn, async (req, res) => {
  const userId = (req.user_id);
      try {
      const transactions = await db(`SELECT * FROM transactions WHERE id = ${userId}`);
      res.send(transactions); 
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  
  // Get transaction by ID
  router.get('/transactions/:id', async (req, res) => {
    const transactionId = (req.params.id);
    try {
      const transaction = await db(`SELECT * FROM transactions WHERE id = ${transactionId}`);
      if (transaction.length === 1) {
        res.send(transaction[0]); // Use res.send() to send the response
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

(`INSERT INTO transactions ('amount', 'date', 'source', 'type', 'category_id', 'user_id')
      VALUES (${amount}, '${date}', '${source}', '${type}', ${category_id}, ${req.user_id})`)
    try {
      // Insert the new transaction into the database
      const result = await db(`INSERT INTO 'transactions' ('amount', 'date', 'source', 'type', 'category_id', 'user_id')
      VALUES (50, '2023-10-15', 'Grocery Store', 'Expense', 3, 1)`);
      const insertedTransaction = await db('SELECT * FROM transactions WHERE id = ?', [result.insertId]);
      res.status(201).send(insertedTransaction[0]); 
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
  

  // Update a transaction by ID
  router.put('/transactions/:id', userShouldBeLoggedIn, async (req, res) => {
    const transactionId = req.params.id;
    const updatedTransaction = req.body;
    try {
      const result = await db(`UPDATE transactions SET  WHERE id =  `updatedTransaction, transactionId]);
      if (result.affectedRows === 1) {
        const updatedTransaction = await db('SELECT * FROM transactions WHERE id = ?', [transactionId]);
        res.send(updatedTransaction[0]); 
      } else {
        res.status(404).send({ error: "Transaction not found" });
      }
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
  
  // Delete a transaction by ID
  router.delete('/transactions/:id', async (req, res) => {
    const transactionId = req.params.id;
    try {
      const result = await db('DELETE FROM transactions WHERE id = ?', [transactionId]);
      if (result.affectedRows === 1) {
        res.send({ message: "Transaction deleted successfully" }); 
      } else {
        res.status(404).send({ error: "Transaction not found" });
      }
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  
  module.exports = router;