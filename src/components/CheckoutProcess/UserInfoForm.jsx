// src/components/CheckoutProcess/UserInfoForm.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const UserInfoForm = ({ onSubmit }) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userInfo);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={userInfo.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={userInfo.address}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={userInfo.phone}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button type="submit">Continuar al pago</Button>
    </Form>
  );
};

export default UserInfoForm;