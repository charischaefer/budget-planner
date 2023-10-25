import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [userId, setUserId] = useState(null);
    const [totalIncome, setTotalIncome] = useState(null);
    const [totalExpenses, setTotalExpenses] = useState(null);

    // Get user data
    const getUser = async () => {
        try {
            const { data } = await axios("/api/users/profile", {
                headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            setUserId(data.userId);
            getIncome(data.userId);
        } catch (error) {
            console.log(error);
        }
    };

    // Get total income
    const getIncome = async (userId) => {
        try {
            const { data } = await axios(`/api/total-income/${userId}`);
            setTotalIncome(data.totalIncome);
            console.log(totalIncome);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
        getIncome();
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
                        <td>1.000</td>
                    </tr>
                </tbody>
            </table>
            <h1>Income</h1>
            <h1>Expenses</h1>
        </div>
    );
}