import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import './FraudSettings.css';

function FraudSettings() {
  const [settings, setSettings] = useState({
    maxTransactionAmount: 500,
    blockList: '',
    alertEmail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'settings', 'fraud'), settings);
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error(`Error saving settings: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, 'settings', 'fraud');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettings(docSnap.data());
      }
    };

    fetchSettings();
  }, []);

  return (
    <div>
      <h2>Fraud Detection Settings</h2>
      <form onSubmit={handleSubmit} className="fraud-settings-form">
        <div className="form-group">
          <label>Max Transaction Amount:</label>
          <input
            type="number"
            name="maxTransactionAmount"
            value={settings.maxTransactionAmount}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Block List (comma-separated IPs):</label>
          <input
            type="text"
            name="blockList"
            value={settings.blockList}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Alert Email:</label>
          <input
            type="email"
            name="alertEmail"
            value={settings.alertEmail}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
}

export default FraudSettings;
