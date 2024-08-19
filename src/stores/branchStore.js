// stores/branchStore.js

import { defineStore } from 'pinia';

export const useBranchStore = defineStore('branchStore', {
  state: () => ({
    selectedBranchId: localStorage.getItem('selectedBranchId') || null, // Yerel depolama ile seçili branch ID'yi yükle
  }),
  actions: {
    setSelectedBranchId(id) {
      this.selectedBranchId = id;
      localStorage.setItem('selectedBranchId', id); // Seçili branch ID'yi yerel depolamaya kaydet
      console.log(id);
    }
  }
});
