export function signup(user) {
  return new Promise(async resolve => {
    // TODO: we will not hard code server url here.
    const response = await fetch('http://localhost:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export async function checkUser(loginInfo) {
  const email = loginInfo?.email;
  const password = loginInfo?.password;

  if (!email || !password) {
    return { data: null, error: 'Invalid email or password' };
  }

  try {
    const response = await fetch(`http://localhost:3001/users?email=${email}`);
    const data = await response.json();

    if (data.length) {
      const user = data[0];
      if (user.password === password) {
        return { data: user };
      } else {
        return { data: null, error: 'Invalid password' };
      }
    } else {
      return { data: null, error: 'User not found' };
    }
  } catch (err) {
    return { data: null, error: err.error || 'Network error' };
  }
}

// export function checkUser(loginInfo) {
//   return new Promise(async (resolve, reject) => {
//     const email = loginInfo?.email;
//     const password = loginInfo?.password;
//     if (email && password) {
//       const response = await fetch(
//         `http://localhost:3001/users?email=${email}`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       const data = await response.json();
//       if (data.length) {
//         const user = data[0];
//         if (user.password === password) {
//           resolve({ data: user });
//         } else {
//           reject({ data: null, error: 'Invalid password' });
//         }
//       } else {
//         reject({ data: null, error: 'User not found' });
//       }
//     } else {
//       reject({ data: null, error: 'Invalid email or password' });
//     }
//   });
// }
