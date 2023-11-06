import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, Cell } from 'recharts';
import "./Home.css";
import TransactionOverview from "./TransactionOverview";


export default function Home() {
    const [totalIncome, setTotalIncome] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(null);

    // Get total income
    const getIncome = async (userId) => {
        try {
            const { data } = await axios("/api/total-income", {
                headers: {
                  authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            setTotalIncome(data.totalIncome?.toFixed(2));
        } catch (error) {
            console.log(error);
        }
    };

    // Get total expenses
    const getExpenses = async (userId) => {
        try {
            const { data } = await axios("/api/total-expenses", {
                headers: {
                  authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            setTotalExpenses(data.totalExpenses.toFixed(2));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getIncome(),
        getExpenses();
    }, []);

    // Calculate remaining income
    const remainingIncome = (totalIncome - totalExpenses).toFixed(2);

    // Calculate percentage of expenses relative to income
    const expensePercentage = (totalExpenses / totalIncome) * 100;

    // Define a style for the red dashed bar
    const redBarStyle = {
        background: `repeating-linear-gradient(135deg, #ff9999, #ff9999 4px, transparent 4px, transparent 8px)`,
        width: `${expensePercentage}%`,
        height: "30px",
    };

    // Define a style for the green dashed bar
    const greenBarStyle = {
        background: `repeating-linear-gradient(135deg, #b0ffbd, #b0ffbd 4px, transparent 4px, transparent 8px)`,
        width: `${100 - expensePercentage}%`,
        height: "30px",
    };

    return (
        <div className="Home">
            <h1 className="first-header">Summary</h1>
            <table className="summary-table">
                <thead>
                    <tr>
                        <th>Income</th>
                        <th>Expenses</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${totalIncome}</td>
                        <td>${totalExpenses}</td>
                    </tr>
                </tbody>
            </table>
            <div style={{ display: "flex", flexDirection: "row", width: "300px", margin: "0 auto" }}>
                <div style={redBarStyle}></div>
                <div style={greenBarStyle}></div>
            </div>
            <p><span style={{ color: 'green', fontWeight: 'bold' }}>${remainingIncome}</span> left off <span style={{ fontWeight: 'bold' }}>${totalIncome}</span></p>
            <h1>Income</h1>
            <TransactionOverview transactionType="Income" />
            <h1>Expenses</h1>
            <TransactionOverview transactionType="Expense" />
        </div>
    );
}