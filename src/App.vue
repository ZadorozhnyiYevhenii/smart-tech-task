<script>
import UserList from './components/UserList.vue';
import UserDetails from './components/UserDetails.vue';
import FormAddUser from './components/FormAddUser.vue';
import CustomSelect from './components/CustomSelect.vue';
import { fetchUsers } from './api/helpers/getUsers';
import { addUser } from './api/helpers/addUser';

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
        this.users = await fetchUsers();
      } catch (error) {
        console.error(error);
      }
    },
    async addUser() {
      try {
        const response = await addUser(this.newUser);
        this.users.push(response);
        this.clearForm();
      } catch (error) {
        console.error(error);
      }
    },
    clearForm() {
      this.newUser.email = '';
      this.newUser.first_name = '';
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
  components: { UserDetails, CustomSelect, FormAddUser, UserList },
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
  <div>
    <div class="user-top">
      <CustomSelect 
        :options="sortOptions"
        v-bind:modelValue="selectedSort"
        v-on:update:modelValue="selectedSort = $event" 
      />
      <input type="text" v-model="searchQuery" placeholder="Search user by name" class="user-top__input">
    </div>

    <UserList 
    :users="sortedAndSearchProducts" 
    :handleUserDelete="handleUserDelete"
    :showUserDetails="showUserDetails"
    />

    <UserDetails 
      :user="selectedUser" 
      :isVisible="isUserDetailsVisible" 
      @close="closeUserDetails" 
    />

    <FormAddUser 
      :newUser="newUser" 
      @addUser="addUser" 
    />
  </div>
</template>
