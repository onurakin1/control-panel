// stores/branchStore.js

import { defineStore } from 'pinia';

export const useBranchStore = defineStore('branchStore', {
  state: () => ({
    selectedBranchId: null, // Initialize selectedBranchId
  }),
  actions: {
    setSelectedBranchId(id) {
      this.selectedBranchId = id;
      console.log(id)
    }
  }
});
