import { useEffect, useState } from 'react';
import { getAllorders } from '../api/orderData';

function Revenue() {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    getAllorders()?.then((data) => setAllOrders(data));
  }, []);

  const getOrderStatus = (orders) => {
    const openOrders = orders.every((order) => order.orderStatusId === 1);
    const closedOrders = orders.every((order) => order.orderStatusId === 2);

    if (openOrders && closedOrders) {
      return 'Both';
    } if (openOrders) {
      return 'Open';
    } if (closedOrders) {
      return 'Closed';
    }
    return 'All';
  };

  const handleFilter = (e) => {
    const { value } = e.target;
    console.log('the value:', value);
    if (value === 'All') {
      setFilteredOrders(allOrders);
    } else {
      const filtered = allOrders?.filter((o) => o?.status?.statusName?.includes(value));
      setFilteredOrders(filtered);
    }
  };

  const paymentTypeCounts = filteredOrders.reduce((acc, order) => {
    const paymentType = order.paymentType.paymentTypeDesc;
    acc[paymentType] = (acc[paymentType] || 0) + 1;
    return acc;
  }, {});

  const orderTypeCounts = filteredOrders.reduce((acc, order) => {
    const orderType = order.orderType.orderTypeName;
    acc[orderType] = (acc[orderType] || 0) + 1;
    return acc;
  }, {});

  console.log('paymenttype count:', paymentTypeCounts);
  console.log('ordertype count:', orderTypeCounts);
  console.log('these are the orders:', allOrders);

  const closedOrders = allOrders?.filter((o) => o.orderStatusId === 2);
  const openOrders = allOrders?.filter((o) => o.orderStatusId === 1);

  console.log('closed orders:', closedOrders);
  console.log('open orders:', openOrders);
  console.log('filtered Orders:', filteredOrders);

  return (
    <>
      <div><h1>Order Summary</h1></div>
      <h4>
        Total Orders: {allOrders?.length}
      </h4>
      <h4>
        Total Closed Orders: {closedOrders?.length}
      </h4>
      <h4>
        Total Open Orders: {openOrders?.length}
      </h4>
      <br />

      <div>
        <select onChange={handleFilter}>
          <option value="">Select Order Status</option>
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
        <br />
        <h4>
          {filteredOrders.length > 0 ? getOrderStatus(filteredOrders) : 'Select for'} Order Statistics:
        </h4>
        <ul>
          <li>Total Number of Orders: {filteredOrders?.length}</li>
          <li>Total Revenue of Orders: ${filteredOrders?.reduce((acc, order) => acc + order?.orderTotal, 0)}</li>
        </ul>
        <h5>Payment Type Counts for {getOrderStatus(filteredOrders)} Orders </h5>
        <ul>
          {Object.entries(paymentTypeCounts).map(([paymentType, count]) => (
            <li key={paymentType}>
              {paymentType}: {count}
            </li>
          ))}
        </ul>

        <h5>Order Type Counts for {getOrderStatus(filteredOrders)} Orders </h5>
        <ul>
          {Object.entries(orderTypeCounts).map(([orderType, count]) => (
            <li key={orderType}>
              {orderType}: {count}
            </li>
          ))}
        </ul>

      </div>
    </>
  );
}

export default Revenue;
