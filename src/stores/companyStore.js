import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCompanyStore = defineStore('company', () => {
    const company = ref({
        company_name: '',
        logo: '',
        id: null,
    });

    const setCompany = (data) => {
        company.value = data;
        localStorage.setItem('company', JSON.stringify(data));
    };

    const loadCompanyFromLocalStorage = () => {
        const storedCompany = localStorage.getItem('company');
        if (storedCompany) {
            company.value = JSON.parse(storedCompany);
        }
    };

    // Load the company data from local storage when the store is initialized
    loadCompanyFromLocalStorage();

    return {
        company,
        setCompany,
    };
});