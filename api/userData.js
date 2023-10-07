const getAllusers = () => new Promise((resolve, reject) => {
  fetch('http://localhost:5232/users/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`http://localhost:5232/userByUid/${uid}`, {
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

export {
  getAllusers,
  getSingleUser,
};
