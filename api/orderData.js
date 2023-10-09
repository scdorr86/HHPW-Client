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

const getSingleorder = (orderId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:5232/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      let data;
      if (res.ok) {
        data = await res.json();
        resolve(data);
      }
    })
    .catch(reject);
});

const deleteSingleOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:5232/api/orders/${orderId}`, {
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
  getSingleorder,
  deleteSingleOrder,
};
