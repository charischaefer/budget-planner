import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TransactionOverview.css";

export default function TransactionOverview({ transactionType }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Get the last three transactions of the specified type
    const getTransactions = async (userId) => {
      try {
        const { data } = await axios(`/api/transactions-by-type/${transactionType}`, {
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
              <td>{transaction.date}</td>
              <td>{transaction.source}</td>
              <td>{transaction.category_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}