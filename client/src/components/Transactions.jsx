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
      <div>
        <NewTransaction />
        <div>
            <table>
                <thead>
                    <tr>
                        
                        <th>
                            amount
                            { transactions && transactions.map(transaction => (<p key={transaction.id} >{transaction.amount} </p>))}
                        </th>
                      
                        <th>
                            date
                            { transactions && transactions.map(transaction => (<p key={transaction.id} >{transaction.date} </p>))}
                        </th>
                      
                        <th>
                          source
                          { transactions && transactions.map(transaction => (<p key={transaction.id} >{transaction.source} </p>))}
                        </th>
                      
                        <th>
                          type
                          { transactions && transactions.map(transaction => (<p key={transaction.id} >{transaction.type} </p>))}
                        </th>
            
                        <th>
                          category_id
                          { transactions && transactions.map(transaction => (<p key={transaction.id} >{transaction.category_id} </p>))}
                        </th>

                        <th>
                          user_id
                          { transactions && transactions.map(transaction => (<p key={transaction.id} >{transaction.user_id} </p>))}
                        </th>
                    </tr>
                </thead>
               
            </table>
        </div>
        </div>
    );
}