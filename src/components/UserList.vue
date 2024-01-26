<script>
import axios from 'axios';
import UserItem from './UserItem.vue';

export default {
  data() {
    return {
      users: [],
      newUser: {
        name: '',
        email: ''
      },
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('https://reqres.in/api/users');
        this.users = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addUser() {
      try {
        const response = await axios.post('https://reqres.in/api/users', this.newUser);
        this.users.push(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    handleUserDelete(deletedUserId) {
      this.users = this.users.filter(user => user.id !== deletedUserId);
    }
  },
  components: { UserItem },
  mounted() {
    this.fetchUsers();
  }
}
</script>

<template>
  <div class="user-list">
    <UserItem
      v-for="user in users"
      :key="user.id"
      :user="user"
      @userDeleted="handleUserDelete"
    />
  </div>
    
    <form @submit.prevent="addUser" class="user-form">
      <label class="user-form__label" for="name">Name:</label>
      <input v-model="newUser.name" type="text" class="user-form__input" placeholder="Your name">

      <label class="user-form__label" for="email">Email:</label>
      <input v-model="newUser.email" type="text" class="user-form__input" placeholder="Your email">

      <button type="submit" class="user-form__button">Add new user</button>
    </form>
</template>

<style lang="scss">
.user-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px;
}

.user-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &__label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  &__input {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  &__button {
    background-color: #3498db;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
      background-color: #217dbb;
    }
  }
}
</style>
