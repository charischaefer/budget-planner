import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns'; 
import "./NewTransaction.css";

function NewTransaction() {
  const initialFormData = {
    amount: 0,
    date: '',
    source: '',
    type: 'Income',
    category_id: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get the corresponding category ID
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, []);

  // Handle the default date
  useEffect(() => {
    const formattedDefaultDate = new Date(format(selectedDate, 'yyyy-MM-dd'));
    setFormData({
      ...formData,
      date: formattedDefaultDate,
    });
  }, [selectedDate]);

  // Submit the form data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCategory = categories.find(category => category.name === formData.category);
    const category_id = selectedCategory ? selectedCategory.id : 0;

    const formattedDate = format(formData.date, 'yyyy-MM-dd');

    const dataToSend = {
      ...formData,
      date: formattedDate,
      category_id: category_id,
      amount: parseFloat(formData.amount),
    };

    delete dataToSend.category;

    console.log(dataToSend);

    try {
      const response = await fetch('/api/transactions/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.status === 201) {
        console.log('Transaction added');
        setFormData(initialFormData);
      } else {
        console.error('Error adding transaction', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "type") {
      setFormData({
        ...formData,
        [name]: value,
        category: value === "Income" ? '0' : formData.category,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      date: date,
    });
  };

  return (
    <div className="NewTransaction">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Type: 
            <input
              type="radio"
              name="type"
              value="Income"
              checked={formData.type === 'Income'}
              onChange={handleChange}
              style={{ marginLeft: '10px' }}
            />
            Income
            <input
              type="radio"
              name="type"
              value="Expense"
              checked={formData.type === 'Expense'}
              onChange={handleChange}
              style={{ marginLeft: '10px' }}
            />
            Expense
          </label>
        </div>
        <label>
          Amount: 
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            style={{ marginLeft: '10px' }}
            placeholder="100"
          />
        </label>
        <label>
          Date:
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            showYearDropdown
            yearDropdownItemNumber={3}
            className="custom-datepicker"
          />
        </label>
        <label>
          Source: 
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            style={{ marginLeft: '10px' }}
            placeholder="Restaurant"
          />
        </label>
        <label>
          Category: 
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={formData.type === 'Income'}
            style={{ fontFamily: 'Montserrat, sans-serif', marginLeft: '10px' }}
          >
            <option value="0">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default NewTransaction;