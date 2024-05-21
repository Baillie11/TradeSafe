import React, { useState, useEffect } from 'react';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './Dashboard.css';

function Dashboard() {
  const [userProfile, setUserProfile] = useState({});
  const [transactionSummary, setTransactionSummary] = useState({
    totalTransactions: 0,
    totalAmount: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [fraudSummary, setFraudSummary] = useState({
    totalFraudAttempts: 0,
    recentFraudAttempts: [],
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      console.log('Current User:', user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log('User Profile:', docSnap.data());
          setUserProfile(docSnap.data());
        } else {
          console.log('No user profile found, using default values');
          setUserProfile({
            displayName: user.displayName || '',
            email: user.email || '',
          });
        }
      }
    };

    const fetchTransactionSummary = async () => {
      const q = query(collection(db, 'transactions'), where('userId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      let totalTransactions = 0;
      let totalAmount = 0;
      const recentTransactions = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        totalTransactions += 1;
        totalAmount += data.amount;
        recentTransactions.push(data);
      });
      setTransactionSummary({ totalTransactions, totalAmount });
      setRecentTransactions(recentTransactions);
    };

    const fetchFraudSummary = async () => {
      const q = query(collection(db, 'fraudAttempts'), where('userId', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      let totalFraudAttempts = 0;
      const recentFraudAttempts = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        totalFraudAttempts += 1;
        recentFraudAttempts.push(data);
      });
      setFraudSummary({ totalFraudAttempts, recentFraudAttempts });
    };

    fetchUserProfile();
    fetchTransactionSummary();
    fetchFraudSummary();
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="welcome-message">
        <h3>Welcome, {userProfile.displayName}</h3>
      </div>
      <div className="dashboard-grid">
        <div className="transaction-summary card">
          <h3>Transaction Summary</h3>
          <p>Total Transactions: {transactionSummary.totalTransactions}</p>
          <p>Total Amount: ${transactionSummary.totalAmount}</p>
        </div>
        <div className="recent-transactions card">
          <h3>Recent Transactions</h3>
          <ul>
            {recentTransactions.slice(0, 5).map((transaction, index) => (
              <li key={index}>
                {transaction.date} - ${transaction.amount}
              </li>
            ))}
          </ul>
        </div>
        <div className="fraud-summary card">
          <h3>Fraud Detection Summary</h3>
          <p>Total Fraud Attempts: {fraudSummary.totalFraudAttempts}</p>
        </div>
        <div className="recent-fraud-attempts card">
          <h3>Recent Fraud Attempts</h3>
          <ul>
            {fraudSummary.recentFraudAttempts.slice(0, 5).map((fraud, index) => (
              <li key={index}>
                {fraud.date} - {fraud.details}
              </li>
            ))}
          </ul>
        </div>
        <div className="quick-access card">
          <h3>Quick Access</h3>
          <ul>
            <li><a href="/profile">User Profile</a></li>
            <li><a href="/fraud-settings">Fraud Settings</a></li>
            <li><a href="/transactions">Transactions</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
