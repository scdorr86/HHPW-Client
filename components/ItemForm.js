import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createItem, getAllItemTypes, updateItem } from '../api/itemData';

const initialState = {
  itemName: '',
  itemTypeId: 0,
  price: 0,
};

function NewItemForm({ itemObj }) {
  const router = useRouter();
  const [formData, setFormdata] = useState(initialState);
  const [itemTypes, setItemTypes] = useState();

  useEffect(() => {
    getAllItemTypes().then((data) => setItemTypes(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const convertValue = (name === 'price' || name === 'itemTypeId') ? Number(value) : value;
    setFormdata((prevState) => ({
      ...prevState,
      [name]: convertValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemObj.id) {
      const updatePayload = { ...formData };
      updateItem(itemObj.id, updatePayload)
        .then(() => router.push('/'));
    } else {
      const payload = { ...formData };
      console.log('this is the submit item payload', payload);
      createItem(payload)
        .then(() => router.push('/'));
    }
  };

  return (
    <>
      <h1>{itemObj.id ? 'Edit' : 'Add New'} Item </h1>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="itemName">
          <Form.Control
            type="text"
            placeholder="Item Name"
            name="itemName"
            value={formData.itemName}
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
        </Form.Group>

        <Form.Group controlId="floatingInput1" label="ItemType" className="mb-3">
          <Form.Select
            type="text"
            placeholder="Select Item Type"
            name="itemTypeId"
            value={formData.itemTypeId}
            onChange={handleChange}
            required
          >
            {/* <option value="">Select Item Type </option> */}
            {itemTypes?.map((type) => (
              <option key={type.id} value={type?.id}>{type.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit"> Submit </Button>
      </Form>
    </>
  );
}

NewItemForm.propTypes = {
  itemObj: PropTypes.shape({
    price: PropTypes.number,
    itemName: PropTypes.string,
    itemTypeId: PropTypes.number,
    id: PropTypes.number,
  }),
};

NewItemForm.defaultProps = {
  itemObj: initialState,
};

export default NewItemForm;
