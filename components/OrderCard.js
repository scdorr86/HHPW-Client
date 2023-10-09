import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteSingleOrder } from '../api/orderData';

function OrderCard({ orderObj }) {
  const router = useRouter();

  const deletePost = () => {
    if (window.confirm('Delete this Post?')) {
      deleteSingleOrder(orderObj?.id).then(() => router.push('/Orders/orders'));
    }
  };

  const viewOrderDetails = () => {
    console.log('Navigating to post details for post ID:', orderObj.id);
    router.push(`/Orders/${orderObj?.id}`);
  };

  console.log('this is the post obj:', orderObj);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Title>Order ID: {orderObj?.id}</Card.Title>
      <Card.Text>Status: {orderObj?.status.statusName}</Card.Text>
      <Card.Text>Type: {orderObj?.orderType.orderTypeName}</Card.Text>
      {/* <Card.Text>
        <strong>Customer Info:</strong> {singlePost?.tags?.[0]?.label}
      </Card.Text> */}
      <Button variant="primary" onClick={viewOrderDetails}>
        View Details
      </Button>
      <Button variant="danger" onClick={deletePost}>
        Delete
      </Button>
      {/* <OrderForm orderObj={orderObj} /> */}
    </Card>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    orderStatusId: PropTypes.number,
    orderTypeId: PropTypes.number,
    orderTotal: PropTypes.number,
    id: PropTypes.number,
    paymentTypeId: PropTypes.number,
    status: PropTypes.shape({
      statusName: PropTypes.string,
    }),
    orderType: PropTypes.shape({
      orderTypeName: PropTypes.string,
    }),
  }).isRequired,
};

export default OrderCard;
