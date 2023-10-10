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

export {
  getAllItems,
  getSingleItem,
};
