import React, { useState } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';
import axios from 'axios';
import styles from './PayoutsPayment.module.css';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkedAlt, FaIdCard } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const PayoutsPayment = ({ totalAmount, userId }) => {
  const { clearCart } = useCart();
  const [customerData, setCustomerData] = useState({
    name: '',
    last_name: '',
    email: '',
    phone_number: '',
    department: '',
    city: '',
    additional: '',
    document_number: ''
  });

  const [receiptUrl, setReceiptUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const paymentData = {
        customer: customerData,
        charge: {
          amount: totalAmount,
          description: 'COMPRA EN Tienda PC',
          order_id: `ORDER-${Date.now()}`,
          iva: 0,
        },
        userId: parseInt(userId, 10), // Aseguramos que userId sea un número
        productId: 1 // Asumimos un ID de producto fijo, ajusta según sea necesario
      };

      const response = await axios.post('https://backend-tienda-mac-production.up.railway.app/api/openpay/store-payment', paymentData);

      console.log('Respuesta del servidor:', response.data);

      if (response.data && response.data.receipt_url) {
        setReceiptUrl(response.data.receipt_url);
        clearCart();
        setTimeout(() => {
          window.location.href = response.data.receipt_url;
        }, 3000);
      } else {
        setError('No se recibió una URL de recibo válida');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setError(error.response?.data?.error || 'Error al procesar el pago. Por favor, intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className={styles.payoutsPaymentForm}>
        <h2 className={styles.formTitle}>Pago con Payouts</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          <Col md={6}>
            <Form.Group controlId="formBasicName" className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>
                <FaUser className={styles.icon} /> Nombre
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="name"
                value={customerData.name}
                onChange={handleInputChange}
                className={styles.formControl}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formBasicLastName" className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>
                <FaUser className={styles.icon} /> Apellido
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellido"
                name="last_name"
                value={customerData.last_name}
                onChange={handleInputChange}
                className={styles.formControl}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formBasicEmail" className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>
                <FaEnvelope className={styles.icon} /> Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={customerData.email}
                onChange={handleInputChange}
                className={styles.formControl}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formBasicPhone" className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>
                <FaPhone className={styles.icon} /> Teléfono
              </Form.Label>
              <Form.Control
                type="tel"
                placeholder="Teléfono"
                name="phone_number"
                value={customerData.phone_number}
                onChange={handleInputChange}
                className={styles.formControl}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formBasicDepartment" className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>
                <FaMapMarkedAlt className={styles.icon} /> Departamento
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Departamento"
                name="department"
                value={customerData.department}
                onChange={handleInputChange}
                className={styles.formControl}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formBasicCity" className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>
                <FaMapMarkedAlt className={styles.icon} /> Ciudad
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ciudad"
                name="city"
                value={customerData.city}
                onChange={handleInputChange}
                className={styles.formControl}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formBasicAdditional" className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>
            <FaMapMarkedAlt className={styles.icon} /> Dirección Adicional
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Dirección Adicional"
            name="additional"
            value={customerData.additional}
            onChange={handleInputChange}
            className={styles.formControl}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicDocumentNumber" className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>
            <FaIdCard className={styles.icon} /> Número de Documento
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Número de Documento"
            name="document_number"
            value={customerData.document_number}
            onChange={handleInputChange}
            className={styles.formControl}
            required
          />
        </Form.Group>
        <div className={styles.buttonContainer}>
          <Button variant="primary" type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Procesando...' : 'Pagar con Payouts'}
          </Button>
        </div>
      </Form>
      {receiptUrl && (
        <div className={styles.barcodeWrapper}>
          <Alert variant="success">
            Pago procesado con éxito. Serás redirigido al recibo en breve.
          </Alert>
          <img src={receiptUrl} alt="Recibo de Pago" />
        </div>
      )}
    </div>
  );
};

export default PayoutsPayment;