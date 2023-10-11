import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FloatingLabel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getAllItems } from '../api/itemData';
import { addItemOrder } from '../api/orderData';

const itemId = 0;

export default function AddItemForm({ orderId }) {
  const [show, setShow] = useState(false);
  const [itemID, setItemID] = useState(itemId);
  const router = useRouter();
  const [items, setItems] = useState();

  const handleClose = () => {
    setShow(false);
    router.push(`/Orders/${orderId}`);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllItems().then((data) => setItems(data));
  }, []);

  console.log('all itemsd and orderId:', orderId, items);

  const handleChange = (e) => {
    const { value } = e.target;
    setItemID(value);
  };

  console.log('check itemID:', itemID);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('on submit:', orderId, itemID);
    addItemOrder(orderId, itemID).then(handleClose());
  };

  return (
    <>
      <Button
        variant="success"
        className=""
        onClick={handleShow}
        style={{ minWidth: '125px' }}
      >
        Add Existing Menu Item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-black" closeButton>
          <Modal.Title style={{ color: 'orange' }}>Add Item to Order</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Form onSubmit={handleSubmit}>

            {/* Add Item  */}
            <FloatingLabel controlId="floatingInput1" label="Item" className="mb-3" style={{ color: 'red' }}>
              <Form.Select
                type="text"
                placeholder="Select Item"
                name="itemId"
                value={itemID}
                onChange={handleChange}
                required
              >
                <option> </option>
                {items?.map((item) => (
                  <option key={item.id} value={item?.id}>{item.itemName}.....${item.price}</option>
                ))}
              </Form.Select>
            </FloatingLabel>

            <Button className="btn btn-dark" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </>
  );
}

AddItemForm.propTypes = {
  orderId: PropTypes.shape({
    orderId: PropTypes.string,
  }).isRequired,
};
