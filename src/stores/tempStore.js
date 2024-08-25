import { defineStore } from 'pinia';

export const useTempStore = defineStore('templateId', {
    state: () => ({
        templateId: localStorage.getItem('templateId') || null,

    }),
    actions: {
        setTempData(templateId) {
            this.templateId = templateId;
            localStorage.setItem('templateId', templateId);

        },
        clearAuthData() {
            this.templateId = null;
            localStorage.removeItem('templateId');

        },

    },
    getters: {

        getTemplate: (state) => state.templateId,

    },
});