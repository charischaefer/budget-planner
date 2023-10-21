var express = require('express');
var router = express.Router();
var db = require("../model/helper.js");

// GET sum of income
router.get('/total-income/:userId', async (req, res) => {
  let userId = req.params.userId;

  try {
    let query = `
    SELECT SUM(amount) as totalIncome
    FROM transactions
    WHERE user_id = ${userId} AND type = 'Income';
    `;

    let results = await db(query);
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET sum of expenses
router.get('/total-expenses/:userId', async (req, res) => {
  let userId = req.params.userId;

  try {
    let query = `
    SELECT SUM(amount) as totalExpenses
    FROM transactions
    WHERE user_id = ${userId} AND type = 'Expense';
    `;
  
    let results = await db(query);
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET transactions by category
router.get('/transactions-by-category/:userId/:categoryId', async (req, res) => {
  let userId = req.params.userId;
  let categoryId = req.params.categoryId;

  try {
    let query = `
    SELECT id, amount, date, source, type
    FROM transactions
    WHERE user_id = ${userId} AND category_id = ${categoryId};
    `;

    let results = await db(query);
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET sum by category
router.get('/expenses-by-category/:userId/:categoryId', async (req, res) => {
  let userId = req.params.userId;
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
    res.status(201).send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;