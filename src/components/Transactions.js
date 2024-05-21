import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transactions.css';

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Use JSONPlaceholder's /posts endpoint as a mock example
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        // Map the response to match your transaction data structure
        const mockTransactions = response.data.slice(0, 10).map(post => ({
          id: post.id,
          date: '2024-05-01', // Placeholder date
          amount: Math.floor(Math.random() * 1000), // Random amount
          status: 'Completed' // Placeholder status
        }));
        setTransactions(mockTransactions);
      })
      .catch(error => {
        console.error('There was an error fetching the transactions!', error);
      });
  }, []);

  return (
    <div>
      <h2>Transaction Monitoring</h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>${transaction.amount}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
