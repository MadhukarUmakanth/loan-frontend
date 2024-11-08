import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../Header';
import './index.css';
import Header from '../Header';

const Repayment = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialAmount = parseFloat(queryParams.get('amount'));
  const weeks = parseInt(queryParams.get('weeks'));

  // Calculate the weekly payment amount
  const weeklyPayment = (initialAmount / weeks).toFixed(2);

  // Initialize week payments
  const weekPayments = Array.from({ length: weeks }, (_, i) => ({
    week: i + 1,
    payment: weeklyPayment,
    date: new Date(Date.now() + i * 7 * 24 * 60 * 60 * 1000),
    paid: false,
  }));

  const [activeWeek, setActiveWeek] = useState(null);
  const [payments, setPayments] = useState(weekPayments);
  const [remainingAmount, setRemainingAmount] = useState(initialAmount);

  // Toggle the selected week to show details and the "Pay" button
  const toggleWeekDetails = (week) => {
    setActiveWeek((prevWeek) => (prevWeek === week ? null : week));
  };

  // Handle payment for the selected week
  const handlePay = (week) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment) =>
        payment.week === week ? { ...payment, paid: true } : payment
      )
    );
    setRemainingAmount((prevAmount) => (prevAmount - weeklyPayment).toFixed(2));
    setActiveWeek(null); // Close the details after payment
  };

  return (
    <div>
      <Header />
      <div className="repayment-container">
        
        {/* Loan Info Card - Always Visible */}
        <div className="loan-info-card">
          <h2>Loan Information</h2>
          <p>Original Loan Amount: ${initialAmount}</p>
          <p>Remaining Amount: ${remainingAmount}</p>
          <p>Number of Weeks: {weeks}</p>
          <p>Weekly Payment: ${weeklyPayment}</p>
        </div>

        {/* Weekly Payment Schedule */}
        <div className="week-payment-cards">
          {payments.map(({ week, payment, date, paid }) => (
            <div
              key={week}
              className={`week-card ${paid ? 'paid' : 'unpaid'}`}
              onClick={() => toggleWeekDetails(week)}
            >
              <div className="week-card-header">
                <p className="week-card-date">{date.toLocaleDateString()}</p>
                <p className="week-card-month">
                  {date.toLocaleString('default', { month: 'short' })}
                </p>
                <p className="week-card-amount">${payment}</p>
              </div>

              {/* Display payment details only for the active, unpaid week */}
              {activeWeek === week && !paid && (
                <div className="week-card-details">
                  <h4>Repayment Details for Week {week}</h4>
                  <p>Payment: ${payment}</p>
                  <button
                    className="toggle-payment-btn mark-paid"
                    onClick={() => handlePay(week)}
                  >
                    Pay
                  </button>
                </div>
              )}
              {/* Show "Paid" status for paid weeks */}
              {paid && (
                <div className="week-card-status">
                  <span className="status-paid">Paid</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Repayment;
