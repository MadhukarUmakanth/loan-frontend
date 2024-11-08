import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Header'

import './index.css';
import Header from '../Header';


const LoanForm = () => {
  const [amount, setAmount] = useState('');
  const [weeks, setWeeks] = useState('');
  const [weeklyPayment, setWeeklyPayment] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [loanDetailsList, setLoanDetailsList] = useState([]);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          weeks: parseInt(weeks)
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setWeeklyPayment(data.weeklyPayment);
        setMessage(data.message);

        setLoanDetailsList((prevList) => [
          ...prevList,
          {
            date: new Date().toLocaleDateString(),
            amount: parseFloat(amount),
            weeks: parseInt(weeks),
            status: 'Pending',
          }
        ]);

        setAmount('');
        setWeeks('');
        setError(null);
      } else {
        setError(data.message || 'Error creating loan request');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  // Handle loan approval
  const handleApprove = (index) => {
    setLoanDetailsList((prevList) =>
      prevList.map((loan, i) =>
        i === index ? { ...loan, status: 'Approved' } : loan
      )
    );
  };

  // Handle payment action
  const handlePay = (index) => {
    const loan = loanDetailsList[index];
    navigate(`/pay?amount=${loan.amount}&weeks=${loan.weeks}`);
  };

  return (
    <div>
      <Header/>
      <div className="loan-form-container">
      <h2 className="loan-form-title">Loan Request</h2>
      <form onSubmit={handleSubmit} className="loan-form-card">
        <div className="input-row">
          <div className="input-group">
            <label>Loan Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Number of Weeks:</label>
            <input
              type="number"
              value={weeks}
              onChange={(e) => setWeeks(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      {weeklyPayment && (
        <p className="weekly-payment">
          Your weekly payment is: <strong>${weeklyPayment}</strong>
        </p>
      )}

      {/* Display multiple loan details */}
      {loanDetailsList.length > 0 && (
        <div className="loan-details-list">
          <h3>All Loan Requests</h3>
          {loanDetailsList.map((loan, index) => (
            <div key={index} className="loan-details">
              <p><strong>Date:</strong> {loan.date}</p>
              <p><strong>Amount:</strong> ${loan.amount}</p>
              <p><strong>Weeks:</strong> {loan.weeks}</p>
              <p><strong>Status:</strong> {loan.status}</p>

              {/* Display Approve button if status is pending */}
              {loan.status === 'Pending' && (
                <button
                  className="approve-button"
                  onClick={() => handleApprove(index)}
                >
                  Approve
                </button>
              )}

              {/* Display Pay button if status is approved */}
              {loan.status === 'Approved' && (
                <button
                  className="pay-button"
                  onClick={() => handlePay(index)}
                >
                  Pay
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default LoanForm;
