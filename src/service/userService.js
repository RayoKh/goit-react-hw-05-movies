const STORAGE_KEY = 'app:user';
export const USER_CHANGE_EVENT = 'user:change';

const notifyUserChange = user => {
  window.dispatchEvent(new CustomEvent(USER_CHANGE_EVENT, { detail: user }));
};

const readStoredUser = () => {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error('Failed to read user from storage', error);
    return null;
  }
};

const persistUser = user => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user to storage', error);
  }
  notifyUserChange(user);
  return user;
};

export const getCurrentUser = () => readStoredUser();

export const registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error('Вкажіть імʼя, email та пароль для реєстрації.');
  }

  const existingUser = readStoredUser();
  if (existingUser && existingUser.email === email) {
    throw new Error('Користувач з таким email вже існує.');
  }

  const newUser = {
    name,
    email,
    password,
    updatedAt: new Date().toISOString(),
  };

  return persistUser(newUser);
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Заповніть email та пароль.');
  }

  const existingUser = readStoredUser();
  if (!existingUser || existingUser.email !== email || existingUser.password !== password) {
    throw new Error('Невірний email або пароль.');
  }

  notifyUserChange(existingUser);
  return existingUser;
};

export const updateUser = async updates => {
  const existingUser = readStoredUser();
  if (!existingUser) {
    throw new Error('Спочатку увійдіть до свого облікового запису.');
  }

  const updatedUser = {
    ...existingUser,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  return persistUser(updatedUser);
};

export const logoutUser = async () => {
  localStorage.removeItem(STORAGE_KEY);
  notifyUserChange(null);
};
