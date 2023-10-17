import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllorders } from '../../api/orderData';
import OrderCard from '../../components/OrderCard';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../api/userData';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [singleUser, setSingleUser] = useState();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { user } = useAuth();

  const getUser = () => {
    getSingleUser(user?.uid)?.then(setSingleUser);
  };

  const getOrders = () => {
    getAllorders()?.then(setOrders);
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  const handleFilter = (e) => {
    const { value } = e.target;
    console.log('the value:', value);
    if (value === 'All') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders?.filter((o) => (
        (o?.status?.statusName?.includes(value) || o?.user?.uid.includes(value))
      ));
      setFilteredOrders(filtered);
    }
  };

  console.log('these are Orders and single user:', orders, singleUser);
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

        <Button variant="success" value="All" onClick={handleFilter} className="min-width-button">
          All
        </Button>
        <Button variant="success" value="Open" onClick={handleFilter} className="min-width-button">
          Open
        </Button>
        <Button variant="success" value="Closed" onClick={handleFilter} className="min-width-button">
          Closed
        </Button>
        <Button variant="success" value={user.uid} onClick={handleFilter} className="min-width-button">
          Current User Orders
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
