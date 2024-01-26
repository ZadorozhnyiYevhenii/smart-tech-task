<template>
  <div class="custom-select custom-select--container">
    <select class="custom-select__select" :value="modelValue" @input="onChange">
      <option disabled value="">Choose</option>
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onChange(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
.custom-select {
  width: 25%;

  &__container {
    position: relative;
    display: inline-block;
  }

  &__select {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;

    &:hover {
      border-color: #999;
    }

    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
    }
  }
}
</style>
