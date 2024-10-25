// src/components/CheckoutProcess/CheckoutProcess.jsx
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserInfoForm from './UserInfoForm';
import PaymentMethods from '../PaymentMethods/PaymentMethods';
import { useCart } from '../../context/CartContext';
import axios from 'axios';

const CheckoutProcess = () => {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({});
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleUserInfoSubmit = (info) => {
    setUserInfo(info);
    setStep(2);
  };

  const handlePayment = async (paymentMethod) => {
    try {
      const orderData = {
        userInfo,
        cartItems,
        totalAmount: totalPrice,
        paymentMethod
      };

      // Enviar datos de la compra a la base de datos
      const response = await axios.post('/api/orders', orderData);

      if (response.data.success) {
        clearCart();
        navigate('/order-confirmation', { state: { orderId: response.data.orderId } });
      } else {
        // Manejar error
        console.error('Error al procesar la orden');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      {step === 1 && (
        <UserInfoForm onSubmit={handleUserInfoSubmit} />
      )}
      {step === 2 && (
        <>
          <PaymentMethods onPaymentSubmit={handlePayment} totalAmount={totalPrice} />
          <Button onClick={() => setStep(1)}>Volver a la información del usuario</Button>
        </>
      )}
    </Container>
  );
};

export default CheckoutProcess;