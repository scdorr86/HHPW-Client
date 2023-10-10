import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleOrder } from '../../api/orderData';
import ItemCard from '../../components/ItemCard';
import AddItemForm from '../../components/AddItemModal';

function OrderDetails() {
  const router = useRouter();
  const { id } = router?.query;
  const [order, setOrder] = useState();

  console.log('this is ID from order route:', id);

  const getOrder = () => {
    getSingleOrder(id)?.then((data) => {
      setOrder(data);
    });
  };

  useEffect(() => {
    getOrder();
  }, [id]);

  console.log('this is the single order:', order);

  if (order == null) {
    return (<div />);
  }

  return (
    <>
      <div><h1>Order Total: {order[0]?.orderTotal}</h1></div>

      <div className="d-flex flex-column">
        {order[0]?.items?.map((item) => (
          <ItemCard key={item?.id} itemObj={item} />
        ))}
      </div>

      <div>
        <AddItemForm orderId={order[0]?.id} />
        <Button variant="primary">
          Go to Payment
        </Button>
      </div>
    </>
  );
}

export default OrderDetails;
