import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TransactionOverview.css";
import NewTransaction from "./NewTransaction";

export default function Transactions({ transactionType }) {
  const [transactions, setTransactions] = useState([]);

  const categoriesMap = {
    0: '💲',
    1: '🏡',
    2: '🚗',
    3: '🍕',
    4: '💡',
    5: '🛡️',
    6: '🌡️',
    7: '💰',
    8: '💳',
    9: '🎥',
    10: '✈️',
    11: '👶',
    12: '💅',
    13: '🐾',
    14: '🧩'
  };

  // Format the date
  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    // Get last three transactions of specified type
    const getTransactions = async (userId) => {
      try {
        const { data } = await axios(`/api/transactions/transactions`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        setTransactions(data);
      } catch (error) {
        console.log(error);
      }
    };

    getTransactions();
  }, [transactionType]);

  return (
    <div className="TransactionOverview">
        <h1>Transactions</h1>
        <NewTransaction />
        <table>
            <thead>
            <tr>
                <th>Amount</th>
                <th>Date</th>
                <th>Source</th>
                <th>Category</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map((transaction) => (
                <tr key={transaction.id}>
                <td>
                    <span
                    style={{
                        color: transaction.type === "Income" ? "green" : "red",
                    }}
                    >
                    ${transaction.amount.toFixed(2)}
                    </span>
                </td>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.source}</td>
                <td>{categoriesMap[transaction.category_id]}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
}