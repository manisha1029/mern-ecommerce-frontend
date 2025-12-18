// export function fetchUserOrders(userId) {
//   return new Promise(async (resolve) => {
//     // TODO: we will not hard code server url here.
//     const response = await fetch(
//       `http://localhost:3001/orders?userId=${userId}`
//     );
//     const data = await response.json();
//     resolve({ data });
//   });
// }

export function fetchLoggedInUserOrders(userId) {
  return new Promise(async resolve => {
    const response = await fetch(
      'http://localhost:3001/orders/?user.id=' + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser(userId) {
  return new Promise(async resolve => {
    const response = await fetch('http://localhost:3001/users/' + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(newUser) {
  return new Promise(async resolve => {
    const response = await fetch('http://localhost:3001/users/' + newUser.id, {
      method: 'PATCH',
      body: JSON.stringify(newUser),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

