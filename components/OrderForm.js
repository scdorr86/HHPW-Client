import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { createOrder, getAllOrderTypes, updateOrder } from '../api/orderData';
import { getSingleUser } from '../api/userData';

const initialState = {
  orderStatusId: 1,
  orderTypeId: 0,
  paymentTypeId: 1,
  userId: '',
};

function NewOrderForm({ orderObj }) {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormdata] = useState(initialState);
  const [userId, setUserId] = useState();
  const [orderTypes, setOrderTypes] = useState();

  useEffect(() => {
    getSingleUser(user[0]?.uid).then((data) => setUserId(data));
  }, []);

  console.log('logged:', user, initialState, userId);

  useEffect(() => {
    getAllOrderTypes().then((data) => setOrderTypes(data));
  }, []);

  console.log('orderTypes:', orderTypes);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const convertValue = (name === 'price' || name === 'orderTypeId') ? Number(value) : value;
    setFormdata((prevState) => ({
      ...prevState,
      [name]: convertValue,
    }));
    console.log('formData on change:', formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderObj.userId) {
      const updatePayload = { ...formData };
      updateOrder(orderObj.userId, updatePayload)
        .then(() => router.push('/Orders/orders'));
    } else {
      const payload = { ...formData, userId: userId[0]?.id, itemIds: [] };
      console.log('this is the submit item payload', payload);
      createOrder(payload)
        .then((data) => {
          console.log('return data', data);
          router.push(`/Orders/${data.id}`);
        });
    }
  };

  return (
    <>
      <h1>{orderObj.userId ? 'Edit' : 'Create New'} Order </h1>
      <Form onSubmit={handleSubmit}>

        {/* <Form.Group className="mb-3" controlId="orderName">
          <Form.Control
            type="text"
            placeholder="Order Name"
            name="orderName"
            value={formData.orderName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Control
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Item Price"
            required
          />
        </Form.Group> */}

        <Form.Group controlId="floatingInput1" label="OrderType" className="mb-3">
          <Form.Select
            type="text"
            placeholder="Select Order Type"
            name="orderTypeId"
            value={formData.orderTypeId}
            onChange={handleChange}
            required
          >
            {/* <option value="">Select Order Type </option> */}
            {orderTypes?.map((type) => (
              <option key={type.id} value={type?.id}>{type.orderTypeName}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit"> Submit </Button>
      </Form>
    </>
  );
}

NewOrderForm.propTypes = {
  orderObj: PropTypes.shape({
    orderStatusId: PropTypes.number,
    orderTypeId: PropTypes.number,
    paymentTypeId: PropTypes.number,
    userId: PropTypes.string,
  }),
};

NewOrderForm.defaultProps = {
  orderObj: initialState,
};

export default NewOrderForm;
