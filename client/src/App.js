// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    category: '',
    amount: 0,
  });

  useEffect(() => {
    // Fetch expense data when the component mounts
    fetch('/api/expenses')
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error('Error fetching expenses:', error));
  }, []);

  const handleAddExpense = () => {
    // Send a POST request to add a new expense
    fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
    })
      .then((res) => res.json())
      .then((data) => setExpenses([...expenses, data]))
      .catch((error) => console.error('Error adding expense:', error));

    setNewExpense({
      description: '',
      category: '',
      amount: 0,
    });
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div>
        <h2>Add Expense</h2>
        <label>
          Description:
          <input
            type="text"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          />
        </label>
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>
      <div>
        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id}>
              {expense.description} - {expense.category} - ${expense.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
