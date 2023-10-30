import React, { useState, useEffect } from 'react';

export default function Categories() {

    //Show a list of Categories when I load the page

    //A state to store the list of Categories
    const [ categories, setCategories ] = useState([]);
    const handleChange = (event) => {
        setCategories(event.target.value);
    };

    //A function to fetch the list of Categories
    const getCategories = async() => {
        const response = await fetch('/api/categories');
        const data = await response.json();
        console.log(data);
        setCategories(data);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div>
            <h1>Categories</h1>                      
                       <select
                        className="custom-select"
                          id="inputGroupSelect01"
                          onChange={handleChange}
                          name="categoryId"
                        >
                          <option selected>Choose...</option>
                          {categories.map((c) => (
                            <option value={c.id} key ={c.id}>{c.categoryName}</option>

                          ))}
                        </select>
        </div>
    );
}