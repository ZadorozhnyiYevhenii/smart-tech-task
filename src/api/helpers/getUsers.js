import { instance } from '../client';

export async function fetchUsers() {
  try {
    const response = await instance.get('/users');
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};