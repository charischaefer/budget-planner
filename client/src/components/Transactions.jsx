import React, { useState, useEffect } from 'react';
import NewTransaction from "./NewTransaction.jsx";
import axios from 'axios';

export default function Transactions() {
    const [ transactions, setTransactions] = useState([]);

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
        console.log(transactions);
        getTransactions();
      }, []);

    return (
        <NewTransaction />
        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>amount</th>
                        <th>date</th>
                        <th>source</th>
                        <th>type</th>
                        <th>category_id</th>
                        <th>user_id</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Iterate through the transactions array and render a unique transaction component for each categories object in the array*/}
                    { transactions && transactions.map(transaction => (<p key={transaction.id} >{transaction.amount} </p>))}
                </tbody>
            </table>
        </div>
    );
}