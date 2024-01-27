import { instance } from "../core";

export async function addUser(newUser) {
  try {
    const response = await instance.post('/users', newUser);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}