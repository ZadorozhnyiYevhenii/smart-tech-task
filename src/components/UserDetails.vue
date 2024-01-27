<script>
export default {
  props: {
    user: Object,
    isVisible: false
  },
  isVisible: {
    type: Boolean,
    required: false,
  },
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>

<template>
  <div v-if="isVisible" class="user-details" @click.stop="closeModal">
    <div @click.stop class="user-details__modal">
      <div class="user-details__header">
        <h2>User Details</h2>
        <button @click="closeModal" class="user-details__close-btn">&times;</button>
      </div>
      <div class="user-details__content">
        <div class="user-details__info">
          <img :src="user.avatar" :alt="user.first_name + ' avatar'" class="user-details__img">
          <div class="user-details__name">{{ user.first_name }} {{ user.last_name }}</div>
          <div class="user-details__email">{{ user.email }}</div>
        </div>
        <div class="user-details__additional">
          <div class="user-details__phone">
            <label for="phone">Phone:</label>
            <input v-model="user.phone" type="text" id="phone" placeholder="Enter phone number">
          </div>
          <div class="user-details__address">
            <label for="address">Address:</label>
            <textarea v-model="user.address" id="address" placeholder="Enter address"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
.user-details {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  &__modal {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    width: 100%;
  }

  &__header {
    padding: 15px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      margin: 0;
    }

    &__close-btn {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
    }
  }

  &__content {
    padding: 15px;

    &__info {
      text-align: center;

      &__img {
        border-radius: 50%;
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
      }

      &__name {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
      }

      &__email {
        color: #777;
      }
    }

    &__additional {
      margin-top: 20px;

      &__phone,
      &__address {
        margin-bottom: 15px;

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333;
        }

        input,
        textarea {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>