import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', {
  state: () => {
    // localStorage'dan veri yükle ve JSON formatında parse et
    const storedCategories = localStorage.getItem('categories');
    const categories = storedCategories ? JSON.parse(storedCategories) : [];

    return {
      categories: categories,
    };
  },
  actions: {
    setCategories(categories) {
      this.categories = categories;
      // Veriyi JSON formatında sakla
      localStorage.setItem('categories', JSON.stringify(categories));

    },
    addCategory(category) {
      this.categories.push(category);
 
      localStorage.setItem('categories', JSON.stringify(this.categories));
    },
    updateCategory(category) {
      const index = this.categories.findIndex(cat => cat.id === category.id);
      if (index !== -1) {
        this.categories[index] = category;

        localStorage.setItem('categories', JSON.stringify(this.categories));
      }
    },
  },
  getters: {
    getCategories: state => state.categories,
    getCategoryById: state => id => state.categories.find(cat => cat.id === id),
  }
});
