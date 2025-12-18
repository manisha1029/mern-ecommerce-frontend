export const createOrder = async order => {
  return new Promise(async resolve => {
    const response = await fetch('http://localhost:3001/orders', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    resolve({ data });
  });
};
