import { defineStore } from 'pinia';

export const useCompanyStore = defineStore('company', {
    state: () => ({
        company: localStorage.getItem('company') || null,

    }),
    actions: {
        setCompData(company) {
            this.company = company;
            localStorage.setItem('company', company);

        },
        clearAuthData() {
            this.company = null;
            localStorage.removeItem('company');

        },

    },
    getters: {

        getCompany: (state) => state.company,

    },
});