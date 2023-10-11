const getSingleItem = (itemId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:5232/items/${itemId}`, {
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

const getAllItems = () => new Promise((resolve, reject) => {
  fetch('http://localhost:5232/items', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getAllItemTypes = () => new Promise((resolve, reject) => {
  fetch('http://localhost:5232/itemTypes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const updateItem = (itemid, payload) => new Promise((resolve, reject) => {
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

const createItem = (payload) => new Promise((resolve, reject) => {
  fetch('http://localhost:5232/item', {
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

export {
  getAllItems,
  getSingleItem,
  getAllItemTypes,
  updateItem,
  createItem,
};
