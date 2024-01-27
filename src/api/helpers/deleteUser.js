import axios from "axios";

export async function deleteUser(userId) {
  try {
    await axios.delete(`https://reqres.in/api/users/${this.user.id}`);
  } catch (error) {
    console.error(error);
  }
};