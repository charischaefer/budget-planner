import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CategoryOverview.css";

export default function CategoryOverview({ categoryName }) {
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

  // Get transactions of selected category
  useEffect(() => {
    const getTransactions = async (userId) => {
      try {
        const { data } = await axios(`/api/transactions-by-category/${categoryName}`, {
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
  }, [categoryName]);

  return (
    <div className="CategoryOverview">
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