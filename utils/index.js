export const getAuthUsers = () => {
  const users = [{
    user: 'SportMaster',
    password: 'gym1234!',
    category: 'sport'
  }, {
    user: 'GreatestFootballer',
    password: 'Best-123',
    category: 'sport'
  }, {
    user: 'MrPancake',
    password: 'Food_531',
    category: 'food'
  }, {
    user: 'WineTaster',
    password: 'Red1990',
    category: 'drinks'
  }, {
    user: 'admin',
    password: 'superuser!2022!',
    category: 'admin'
  }];

  return users;
}

export const checkUserLogin = (user) => {
  const { username, password } = user;
  const users = getAuthUsers();

  return users.find((user) => user.user === username && user.password === password);
}


export const getUserCategory = (username) => {
  return users.find((userObj) => username === userObj.user)?.category || 'No-Category';
}