var express = require('express');
var router = express.Router();
var db = require("../model/helper.js");
const userShouldBeLoggedIn = require('../guards/UserShouldBeLoggedIn.js');

// GET sum of income
router.get('/total-income', userShouldBeLoggedIn, async (req, res) => {
  let userId = req.user_id;

  try {
    let query = `
    SELECT SUM(amount) as totalIncome
    FROM transactions
    WHERE user_id = ${userId} AND type = 'Income';
    `;

    let results = await db(query);
    res.status(200).send(results.data[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET sum of expenses
router.get('/total-expenses', userShouldBeLoggedIn, async (req, res) => {
  let userId = req.user_id;

  try {
    let query = `
    SELECT SUM(amount) as totalExpenses
    FROM transactions
    WHERE user_id = ${userId} AND type = 'Expense';
    `;
  
    let results = await db(query);
    res.status(200).send(results.data[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET last three transactions by type
router.get('/transactions-by-type/:transactionType', userShouldBeLoggedIn, async (req, res) => {
  let userId = req.user_id;
  let transactionType = req.params.transactionType;

  try {
    let query = `
    SELECT id, amount, date, source, type, category_id
    FROM transactions
    WHERE user_id = ${userId} AND type = '${transactionType}'
    ORDER BY date DESC
    LIMIT 3;
    `;

    let results = await db(query);
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET all categories
router.get('/categories', async (req, res) => {
  try {
    let results = await db('SELECT * FROM categories');
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET transactions by category
router.get('/transactions-by-category/:categoryId', userShouldBeLoggedIn, async (req, res) => {
  let userId = req.user_id;
  let categoryId = req.params.categoryId;

  try {
    let query = `
    SELECT id, amount, date, source, type
    FROM transactions
    WHERE user_id = ${userId} AND category_id = ${categoryId};
    `;

    let results = await db(query);
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET sum by category
router.get('/expenses-by-category/:categoryId', userShouldBeLoggedIn, async (req, res) => {
  let userId = req.user_id;
  let categoryId = req.params.categoryId;

  try {
    let query = `
    SELECT c.name AS category, SUM(t.amount) AS totalExpense
    FROM categories c
    LEFT JOIN transactions t ON c.id = t.category_id
    WHERE t.user_id = ${userId} AND t.type = 'Expense' AND c.id = ${categoryId}
    GROUP BY c.id;
    `;

    let results = await db(query);
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get category percentages
router.get('/category-percentages', userShouldBeLoggedIn, async (req, res) => {
  let userId = req.user_id;

  try {
    let query = `
      SELECT c.name AS category, (SUM(t.amount) / (SELECT SUM(amount) FROM transactions WHERE user_id = ${userId} AND type = 'Expense')) * 100 AS percentage
      FROM categories c
      LEFT JOIN transactions t ON c.id = t.category_id
      WHERE t.user_id = ${userId} AND t.type = 'Expense'
      GROUP BY c.id;
    `;

    let results = await db(query);
    res.status(200).send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;