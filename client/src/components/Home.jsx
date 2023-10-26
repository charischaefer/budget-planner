import React, { useState, useEffect } from "react";
import axios from "axios";

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

            setTotalIncome(data.totalIncome);
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

            setTotalExpenses(data.totalExpenses);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getIncome(),
        getExpenses();
    }, []);

    return (
        <div>
            <h1>Summary</h1>
            <table>
                <thead>
                    <tr>
                        <th>Income</th>
                        <th>Expenses</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{totalIncome}</td>
                        <td>{totalExpenses}</td>
                    </tr>
                </tbody>
            </table>
            <h1>Income</h1>
            <h1>Expenses</h1>
        </div>
    );
}