<template>
  <div class="color-picker">
    <input type="color" v-model="color" @input="updateColor" />
  </div>
</template>

<script>
export default {
  props: {
    selectedColor: {
      type: String,
      default: '#000000' // Varsayılan renk kodu
    }
  },
  data() {
    return {
      color: this.selectedColor // selectedColor'u color ile eşleştiriyoruz
    };
  },
  methods: {
    updateColor() {
      this.$emit('color-changed', this.color);
    },
  },
};
</script>
  
  <style scoped>
  .color-picker {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 8px;

  }
  .color-text{
    font-weight: 500;
  }
  
  .color-picker input[type="color"] {
    width: 30px;
    padding: 0;
    height: 30px;
    border: none;
    cursor: pointer;
    border-radius: 8px;
  }
  input[type="color"]::-webkit-color-swatch {

	border-radius: 8px;
}
  </style>
  