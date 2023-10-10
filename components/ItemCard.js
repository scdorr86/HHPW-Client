import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteItemOrder } from '../api/orderData';

function ItemCard({ itemObj }) {
  // const router = useRouter();
  const deleteItemFromOrder = () => {
    if (window.confirm(`Delete ${itemObj?.itemName} from order ${itemObj?.orderId}?`)) {
      deleteItemOrder(itemObj?.orderId, itemObj.id);
    }
  };

  console.log('this is the item obj:', itemObj);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Title>Item: {itemObj?.itemName}</Card.Title>
      <Card.Text>Price: ${itemObj?.price}</Card.Text>

      <Button className="btn btn-light" onClick={console.log('test edit')}>
        Edit
      </Button>

      <Button style={{ color: 'red' }} className="btn btn-light" onClick={deleteItemFromOrder}>
        Delete
      </Button>
    </Card>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    itemName: PropTypes.string,
    itemTypeId: PropTypes.number,
    price: PropTypes.number,
    id: PropTypes.number,
    orderId: PropTypes.number,
  }).isRequired,
};

export default ItemCard;
