// stores/useCategoryStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    allergens: [],
    products: [],
  }),
  actions: {
    async getAllergens() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/allergen');
        this.allergens = response.data;
      } catch (error) {
        console.error('Error fetching allergens:', error);
      }
    },
    async getCategories(id) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product-category/${id}`);
        this.categories = response.data.map(category => ({
          ...category,
          showChildren: false,
        }));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async viewProducts(categoryId) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product/${categoryId}`);
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  },
});
