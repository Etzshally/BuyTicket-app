import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const TicketPayment = ({ match }) => {
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setPaymentError(error.message);
        setPaymentSuccess('');
      } else {
        const { id } = paymentMethod;
        const response = await axios.post(
          'http://localhost:5000/payment',
          {
            token: { id },
            amount: 1000, // Replace with the actual ticket price
            eventName: 'Event Name', // Replace with the actual event name
          },
          { headers: { Authorization: localStorage.getItem('token') } }
        );

        if (response.data.success) {
          setPaymentSuccess('Payment successful!');
          setPaymentError('');
        }
      }
    } catch (error) {
      setPaymentError(error.message);
      setPaymentSuccess('');
    }
  };

  return (
    <div>
      <h2>Ticket Payment</h2>
      <form onSubmit={handlePayment}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay Now
        </button>
      </form>
      {paymentError && <p>{paymentError}</p>}
      {paymentSuccess && <p>{paymentSuccess}</p>}
    </div>
  )
}

export default TicketPayment;