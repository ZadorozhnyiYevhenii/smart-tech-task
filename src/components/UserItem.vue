<script>
import axios from 'axios';

export default {
  props: {
    user: Object
  },
  methods: {
    async deleteUser() {
      try {
        await axios.delete(`https://reqres.in/api/users/${this.user.id}`);
        this.$emit('userDeleted', this.user.id);
      } catch (error) {
        console.error(error);
      }
    },
    showDetails() {
      this.$emit('userSelected', this.user);
    }
  }
}
</script>

<template>
  <div class="user" @click="showDetails">
    <img :src="user.avatar" :alt="user.first_name + '-' + user.avatar" class="user__img">
    <div class="user__info">
      <div class="user__name">{{ user.first_name }}</div>
      <div class="user__email">{{ user.email }}</div>
    </div>
    <button @click="deleteUser" class="user__delete-btn">Delete user</button>
  </div>
</template>

<style lang="scss">
.user {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;

  &__img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }

  &__info {
    flex: 1;
  }

  &__name {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
    cursor: pointer;
  }

  &__email {
    color: #777;
  }

  &__delete-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 12px;

    &:hover {
      background-color: #c0392b;
    }
  }
}
</style>

