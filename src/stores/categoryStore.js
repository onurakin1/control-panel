import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
  }),
  actions: {
    setCategories(categories) {
      this.categories = categories;
    },
    addCategory(category) {
      this.categories.push(category);
    },
    updateCategory(category) {
      const index = this.categories.findIndex(cat => cat.id === category.id);
      if (index !== -1) {
        this.categories[index] = category;
      }
    },
  },
  getters: {
    getCategories: state => state.categories,
    getCategoryById: state => id => state.categories.find(cat => cat.id === id),
  }
});
