<template>
  <div class="container my-4">

    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-primary mb-4" @click="createMenu" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
        Add Menu
      </button>

    </div>

    <CardComponent v-for="cat in categories"
      :class="{ 'drag-over': cat === dragOverCategory, 'dragged': cat === draggedCategory }" draggable="true"
      @dragstart="dragStart($event, cat)" @dragover.prevent="dragOver($event, cat)" @dragleave="dragLeave"
      @drop="drop($event, cat)" :key="cat.id" :icon="cat.image" :title="cat.name" :showEdit="true" :showView="true"
      class="custom-card" @edit="editCategory(cat)" @view="viewCategory(cat)" />


    <OffCanvas id="offcanvasRight" :title="'Add Menu'" :mode="mode" :newMenu="newCategory" :editMenu="editableMenu"
      @createdMenu="addCategory" @updatedMenu="updateCategory" />

  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import CardComponent from '@/components/MenuCardComp.vue';
import OffCanvas from '@/components/OffCanvas.vue';
import { useCategoryStore } from '@/stores/categoryStore';

export default {
  name: 'App',
  components: {
    CardComponent,
    OffCanvas
  },
  data() {
    return {

      draggedCategory: null,
      dragOverCategory: null,
      icon: "bi bi-menu-button-wide",
      editableMenu: {},
      sendCategory:{},
      mode: 'createMenu',
      newCategory: {
        branch_id: 0,
        image: '',
        name: '',
        language_id: 0
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const id = this.$route.params.id;
      axios.get(`https://panel.dinelim.ai/api/category/${id}`)
        .then(response => {
          const categoryStore = useCategoryStore(); 
          categoryStore.setCategories(response.data); 
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
    },
    updateCategory(category) {
      console.log(category)
      this.sendCategory = category;

      axios
        .put(
           `https://panel.dinelim.ai/api/category/${category.id}`,
          this.sendCategory
        )
        .then((response) => {
          console.log(response);
          toast.success('Category updated successfully!');
          this.$router.go();
        });
    },
    addCategory(category) {
      console.log(category)
      const categoryStore = useCategoryStore(); 
      category.branch_id = this.$route.params.id;
      axios.post('https://panel.dinelim.ai/api/category', category)
        .then(response => {
          categoryStore.addCategory(response.data);

          this.newCategory = { title: '', language_id: 0 };


        })
        .catch(error => {
          console.error('There was an error adding the category!', error);
        });
    },
    createMenu() {
      this.mode = 'createMenu';
    },
    editCategory(category) {
      this.mode = 'editMenu';
      this.editableMenu = category
      console.log(this.editableMenu)
    },
    viewCategory(category) {
      this.$router.push({ name: 'CategoryMenuDetails', params: { id: category.parent_id } });

    },
    dragStart(event, category) {
      this.draggedCategory = category;
    },
    dragOver(event, category) {
      this.dragOverCategory = category;
    },
    dragLeave() {
      this.dragOverCategory = null;
    },
    drop(event, category) {
      const categoryStore = useCategoryStore(); 
      const categories = categoryStore.getCategories; 

      const draggedIndex = categories.findIndex(c => c.id === this.draggedCategory.id);
      const droppedIndex = categories.findIndex(c => c.id === category.id);

      categories.splice(draggedIndex, 1);
      categories.splice(droppedIndex, 0, this.draggedCategory);

      this.draggedCategory = null;
      this.dragOverCategory = null;
    },

  },
  computed: {
    categories() {
      const categoryStore = useCategoryStore(); 
      console.log(categoryStore.getCategories)
      return categoryStore.getCategories.filter((menuItem) => menuItem.language_id == 0);
    }
  }

}
</script>

<style>
.custom-row {
  row-gap: 2rem;
  column-gap: 2rem;

}

.custom-card {
  margin-bottom: 2rem;

}
</style>
