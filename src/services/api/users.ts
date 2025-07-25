export interface User {
  id: number;
  name: string;
  email: string;
}

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const getUserById = async (id: number): Promise<User> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('User not found');
  return res.json();
};

export const addUser = async (newUser: Partial<User>): Promise<User> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  if (!res.ok) throw new Error('Failed to add user');
  return res.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete user');
};
