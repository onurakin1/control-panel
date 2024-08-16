// stores/templateStore.js
import { defineStore } from 'pinia';

export const useTemplateStore = defineStore('template', {
  state: () => ({
    selectedTemplate: null,
  }),
  actions: {
    selectTemplate(templateName) {
      this.selectedTemplate = templateName;
    },
  },
});