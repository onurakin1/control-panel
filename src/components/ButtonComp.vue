<template>
    <button
      :style="buttonStyles"
      @click="handleClick"
    >
      <slot>Button</slot>
    </button>
  </template>
  
  <script>
  export default {
    name: 'DynamicButton',
    props: {
      width: {
        type: String,
        default: '100px',
      },
      height: {
        type: String,
        default: '50px',
      },
      backgroundColor: {
        type: String,
        default: '#007bff',
      },
      textColor: {
        type: String,
        default: '#ffffff',
      },
      fontSize: {
        type: String,
        default: '16px',
      },
    },
    computed: {
      buttonStyles() {
        return {
          width: this.width,
          height: this.height,
          backgroundColor: this.backgroundColor,
          color: this.textColor,
          fontSize: this.fontSize,
        };
      },
    },
    methods: {
      handleClick() {
        this.$emit('click');
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    border: none;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    line-height: 1.5;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    transition: background-color 0.3s;
  }
  
  button:hover {
    opacity: 0.8;
  }
  </style>