<script>
import axios from 'axios';
import UserItem from './UserItem.vue';
import UserDetails from './UserDetails.vue';
import CustomSelect from './CustomSelect.vue';

export default {
  data() {
    return {
      users: [],
      newUser: {
        name: '',
        email: '',
      },
      searchQuery: '',
      selectedSort: '',
      sortOptions: [
        { value: 'first_name', name: 'Sort by name' },
        { value: 'email', name: 'Sort by email' }
      ],
      isUserDetailsVisible: false,
      selectedUser: null
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
    },
    showUserDetails(user) {
      this.selectedUser = user;
      this.isUserDetailsVisible = true;
    },
    closeUserDetails() {
      this.selectedUser = null;
      this.isUserDetailsVisible = false;
    }
  },
  components: { UserItem, UserDetails, CustomSelect },
  mounted() {
    this.fetchUsers();
  },
  computed: {
    sortedUsers() {
      return [...this.users].sort((user1, user2) => user1[this.selectedSort]?.localeCompare(user2[this.selectedSort]));
    },
    sortedAndSearchProducts() {
      return this.sortedUsers.filter(user => user.first_name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
};
</script>


<template>
  <div class="user-top">
    <CustomSelect 
      :options="sortOptions" 
      v-bind:modelValue="selectedSort"
      v-on:update:modelValue="selectedSort = $event" 
      />
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Search user by name"
      class="user-top__input"
      >
  </div>

  <div class="user__list">
    <UserItem 
      v-for="user in sortedAndSearchProducts" 
      :key="user.id" 
      :user="user" 
      @userDeleted="handleUserDelete"
      @userSelected="showUserDetails"
      />  
  </div>

    <UserDetails 
      :user="selectedUser" 
      :isVisible="isUserDetailsVisible" 
      @close="closeUserDetails"
    />

  <form @submit.prevent="addUser" class="user-form">
    <label class="user-form__label" for="name">Name:</label>
    <input v-model="newUser.first_name" type="text" class="user-form__input" placeholder="Your name">

    <label class="user-form__label" for="email">Email:</label>
    <input v-model="newUser.email" type="text" class="user-form__input" placeholder="Your email">

    <button type="submit" class="user-form__button">Add new user</button>
  </form>
</template>

<style lang="scss">
.user-top {
  display: flex;
  gap: 20px;
  margin: 20px;

  &__input {
    padding: 8px;
    margin-bottom: 15px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}

.user__list {
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
