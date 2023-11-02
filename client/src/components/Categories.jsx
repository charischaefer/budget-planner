import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Label } from "recharts";

export default function Categories() {
    const [categoryData, setCategoryData] = useState(null);

    // Get category percentages
    const getCategoryPercentages = async (userId) => {
        try {
            const { data } = await axios("/api/category-percentages", {
                headers: {
                    authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            setCategoryData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategoryPercentages();
    }, []);

    const COLORS = ['#E57373', '#81C784', '#64B5F6', '#FFD54F', '#FF8A65', '#F06292', '#4DB6AC', '#7986CB', '#A1887F', '#90A4AE', '#FFB74D', '#4DD0E1', '#FF80AB', '#B39DDB'];

    return (
        <div>
          <h1>Categories</h1>
          {categoryData && categoryData.length > 0 ? (
            <PieChart width={500} height={500}>
              <Pie dataKey="percentage" data={categoryData} cx="50%" cy="50%" outerRadius={150} fill="#8884d8" nameKey="category">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [value.toFixed(2) + ' %', name]} />
              <Label content={({ value }) => `${value}%`} position="center" />
            </PieChart>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
    }