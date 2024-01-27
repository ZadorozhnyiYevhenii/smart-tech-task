<script>
import UserItem from './UserItem.vue';

export default {
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
  components: { UserItem },
  methods: {
    handleUserDelete(userId) {
      this.$emit('userDeleted', userId);
    },
    handleShowUserDetails(user) {
      this.$emit('userSelected', user);
    }
  } 
};
</script>

<template>

  <div class="user__list">
    <UserItem 
      v-for="user in users" 
      :key="user.id" 
      :user="user"
      @userDeleted="handleUserDelete(user.id)" 
      @userSelected="handleShowUserDetails(user)"
    />
  </div>

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