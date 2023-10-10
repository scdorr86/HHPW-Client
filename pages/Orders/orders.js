import { useEffect, useState } from 'react';
import { getAllorders, getSingleorder } from '../../api/orderData';
import OrderCard from '../../components/OrderCard';

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    getAllorders().then(setOrders);
  };

  useEffect(() => {
    getOrders();
  }, []);

  console.log('these are Orders:', orders);

  return (
    <>
      {/* <AddOrderForm /> */}
      {/* <OrderForm /> */}
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '22vh',
          padding: '7px',
          maxWidth: '100px',
          margin: '0 auto',
        }}
      >
        <h1>All Orders</h1>

      </div>
      <div className="d-flex justify-content-between">
        {orders?.map((order) => (
          <OrderCard key={order.id} orderObj={order} />))}
      </div>
    </>
  );
}

export default OrdersPage;
