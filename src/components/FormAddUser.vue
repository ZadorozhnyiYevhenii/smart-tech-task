<script>
export default {
  data() {
    return {
      validationErrors: {
        name: '',
        email: ''
      }
    };
  },
  props: {
    newUser: Object,
  },
  methods: {
    addUser() {
      this.validateForm();

      if (Object.values(this.validationErrors).every(error => !error)) {
        this.$emit('addUser');
      }
    },
    validateForm() {
      this.validationErrors = {
        name: '',
        email: ''
      };

      if (this.newUser.first_name.trim() <= 5) {
        this.validationErrors.name = 'Name is required';
      }

      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.newUser.email.trim()) {
        this.validationErrors.email = 'Email is required';
      } else if (!emailRegex.test(this.newUser.email.trim())) {
        this.validationErrors.email = 'Invalid email format';
      }
    },
  }
}
</script>

<template>
  <form @submit.prevent="addUser" class="user-form">
    <label v-if="!validationErrors.name" class="user-form__label" for="name">Name:</label>
    <span v-else class="user-form__label user-form__label--error">{{ validationErrors.name }}</span>
    <input v-model="newUser.first_name" type="text" class="user-form__input" placeholder="Your name">

    <label v-if="!validationErrors.email" class="user-form__label" for="email">Email:</label>
    <span v-else class="user-form__label user-form__label--error">{{ validationErrors.email }}</span>
    <input v-model="newUser.email" type="text" class="user-form__input" placeholder="Your email">

    <button 
      type="submit" 
      class="user-form__button"
      :class="{ 'disabled': !newUser.first_name || !newUser.email }"
      :disabled="!newUser.first_name || !newUser.email"
    >
      Add new user
    </button>
  </form>
</template>

<style scoped lang="scss">
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

    &--error {
      color: red;
    }
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

    &.disabled {
      background-color: grey;
      cursor: not-allowed;

      &:hover {
        background-color: grey;
      }
    }

    &:hover {
      background-color: #217dbb;
    }
  }
}
</style>
