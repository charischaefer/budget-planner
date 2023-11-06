import React, { useState, useEffect } from 'react';
import NewTransaction from "./NewTransaction.jsx";
import axios from 'axios';
// import styled from "styled-components";
// import { useTable } from "react-table";
// import Dropdown, {
//   DropdownToggle,
//   DropdownMenu,
//   DropdownMenuWrapper,
//   MenuItem,
//   DropdownButton
// } from "@trendmicro/react-dropdown";
// import { FaTrashAlt } from "react-icons/fa";
// import "@trendmicro/react-buttons/dist/react-buttons.css";
// import "@trendmicro/react-dropdown/dist/react-dropdown.css";
// import makeData from "./makeData";
// const Styles = styled.div`
//   padding: 1rem;
//   table {
//     border-spacing: 0;
//     border: 1px solid black;
//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }
//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;
//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `;
// function Table({ columns, data }) {
//   // Use the state and functions returned from useTable to build your UI
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow
//   } = useTable({
//     columns,
//     data
//   });

export default function Transactions() {
    const [ transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Get last three transactions of specified type
        const getTransactions = async () => {
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
