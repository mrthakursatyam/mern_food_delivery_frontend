import './OrderSuccessful.css'
import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation()
  const {orderId} = location.state || "";

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <div className="brand-header">
          <h1>Foody</h1>
        </div>
        <div className="order-success-message">
          <h2>Order Successful!</h2>
          <p>Thank you for your order. Your order has been placed successfully.</p>
          <div className="order-details">
            <p><strong>Order ID:</strong> {orderId}</p>
          </div>
          <p>You will receive a confirmation email shortly.</p>
          <Link to="/" className="continue-shopping">
            More Food
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
