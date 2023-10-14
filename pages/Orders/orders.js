import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllorders } from '../../api/orderData';
import OrderCard from '../../components/OrderCard';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const getOrders = () => {
    getAllorders().then(setOrders);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleFilter = (e) => {
    const { value } = e.target;
    console.log('the value:', value);
    if (value === 'All') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders?.filter((o) => o?.status?.statusName?.includes(value));
      setFilteredOrders(filtered);
    }
  };

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
      <div className="d-flex justify-content-around m-3">
        <Button variant="success" value="All" onClick={handleFilter}>
          All
        </Button>
        <Button variant="success" value="Open" onClick={handleFilter}>
          Open
        </Button>
        <Button variant="success" value="Closed" onClick={handleFilter}>
          Closed
        </Button>
      </div>

      <div className="d-flex justify-content-between">
        {filteredOrders.length === 0 ? (
          orders?.map((order) => (
            <OrderCard key={order.id} orderObj={order} />
          ))
        ) : (
          filteredOrders?.map((order) => (
            <OrderCard key={order.id} orderObj={order} />
          ))
        )}
      </div>
    </>
  );
}

export default OrdersPage;
