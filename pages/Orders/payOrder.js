import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import {
  getAllPaymentTypes,
  getSingleOrder,
  // updateOrder,
} from '../../api/orderData';

const PaymentForm = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [formData, setFormdata] = useState({
    paymentTypeId: 0,
  });
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      getSingleOrder(orderId).then((data) => setOrder(data));
    }
  }, [orderId]);

  useEffect(() => {
    getAllPaymentTypes().then((data) => setPaymentTypes(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: parseInt(value, 10),
    }));
    console.log('this is the updated state and name value', formData, 'name:', name, 'value', value);
    console.log('payment types:', paymentTypes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      paymentTypeId: formData.paymentTypeId,
      orderTypeId: order.orderTypeId,
      orderStatusId: 2,
    };
    console.log('submit payload:', payload);

    // updateOrder(orderId, payload).then(() => router.push('/Orders/orders'));
  };

  if (!order) {
    return null;
  }

  return (
    <div>
      <h1>{order ? 'Pay' : 'Create New'} Order</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="paymentTypeSelect" className="mb-3">
          <Form.Label>Payment Type</Form.Label>
          <Form.Select
            name="paymentTypeId"
            onChange={handleChange}
            value={formData.paymentTypeId}
            required
          >
            <option value={0}>Select Payment Type</option>
            {paymentTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.paymentTypeDesc}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PaymentForm;
