// import React, { useState, useEffect } from 'react';
// import NewTransaction from "./NewTransaction.jsx";
// import axios from 'axios';
// import "./TransactionOverview.css";

// export default function Transactions() {
//     const [ transactions, setTransactions] = useState([]);

//     const categoriesMap = {
//       0: '💲',
//       1: '🏡',
//       2: '🚗',
//       3: '🍕',
//       4: '💡',
//       5: '🛡️',
//       6: '🌡️',
//       7: '💰',
//       8: '💳',
//       9: '🎥',
//       10: '✈️',
//       11: '👶',
//       12: '💅',
//       13: '🐾',
//       14: '🧩'
//     };
//     useEffect(() => {
//         // Get last three transactions of specified type
//         const getTransactions = async () => {
//           try {
//             const { data } = await axios(`/api/transactions/transactions`, {
//               headers: {
//                 authorization: "Bearer " + localStorage.getItem("token"),
//               },
//             });
//             setTransactions(data);
//           } catch (error) {
//             console.log(error);
//           }
//         };
//         console.log(transactions);
//         getTransactions();
//       }, []);

//     return (
//       <div className="TransactionOverview">
//         <NewTransaction />
//         <div>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>
//                             amount
//                             { transactions && transactions.map(transaction => (<p key={transaction.id} >{transaction.amount} </p>))}
//                         </th>
                      
//                         <th>
//                             date
//                             { transactions && transactions.map(transaction => (<p key={transaction.id} >{transaction.date} </p>))}
//                         </th>
                      
//                         <th>
//                           source
//                           { transactions && transactions.map(transaction => (<p key={transaction.id} >{transaction.source} </p>))}
//                         </th>
                      
//                         <th>
//                           type
//                           { transactions && transactions.map(transaction => (<p key={transaction.id} >{transaction.type} </p>))}
//                         </th>
            
//                         <th>
//                           category_id
//                           { transactions && transactions.map(transaction => (<p key={transaction.id} >{transaction.category_id} </p>))}
//                           {categoriesMap[transactions.category_id]}
//                         </th>
                        
//                     </tr>
//                 </thead>
                
//                <tbody>
              
//                </tbody>
//             </table>
//         </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TransactionOverview.css";

export default function TransactionOverview({ transactionType }) {
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