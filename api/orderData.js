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
  fetch(`https://localhost:5232/api/order/${orderId}/items/${itemId}`, {
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
  fetch(`https://localhost:5232/api/orders/${orderId}/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllorders,
  getSingleOrder,
  deleteSingleOrder,
  deleteItemOrder,
  addItemOrder,
};
