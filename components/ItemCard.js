import PropTypes from 'prop-types';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';

function ItemCard({ itemObj }) {
  // const router = useRouter();

  const deleteItemFromOrder = () => {
    if (window.confirm('Delete this item?')) {
      // deleteSingleItem(itemObj?.id).then(() => router.push('/Orders/$'));
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
  }).isRequired,
};

export default ItemCard;
