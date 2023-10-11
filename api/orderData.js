const getAllorders = () => new Promise((resolve, reject) => {
  fetch('http://localhost:5232/orders/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:5232/order/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res?.ok) {
        data = await res?.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const deleteSingleOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:5232/api/order/${orderId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const addItemOrder = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:5232/api/order/${orderId}/items/${itemId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteItemOrder = (orderId, itemId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:5232/api/orders/${orderId}/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getAllOrderTypes = () => new Promise((resolve, reject) => {
  fetch('http://localhost:5232/orderTypes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createOrder = (payload) => new Promise((resolve, reject) => {
  fetch('http://localhost:5232/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrder = (itemid, payload) => new Promise((resolve, reject) => {
  fetch(`http://localhost:5232/api/updateitem/${itemid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getAllorders,
  getSingleOrder,
  deleteSingleOrder,
  deleteItemOrder,
  addItemOrder,
  getAllOrderTypes,
  createOrder,
  updateOrder,
};
