<template>
  <div>
    <div style="width: 100%; max-width: 800px; row-gap: 16px" class="container">
      <div class="row menu-box-row">
        <div class="col menu-box add mt-5 mb-4">
          <div class="btn-group">
            <button class="btn box-menu-action" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true"
              aria-expanded="false">
              <i class="bi bi-plus-lg me-2"></i>Add
            </button>
            <ul class="dropdown-menu">
              <li @click="createCategory(0)" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight">
                <span class="ms-2">Category</span>
              </li>
              <li @click="createProduct(0)" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight">
                <span class="ms-2">Product</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="categories.length">
        <div v-for="category in sortedCategories" :key="category.category_id">
          <div class="row menu-box-row" data-bs-toggle="collapse" :href="'#collapse_' + category.category_id"
            role="button" aria-expanded="false" :aria-controls="'collapse_' + category.category_id" :class="{
              'drag-over': category === dragOverCategory,
              dragged: category === draggedCategory,
            }" draggable="true" @dragstart="dragStart($event, category)" @dragover.prevent="dragOver($event, category)"
            @dragleave="dragLeave" @drop="drop($event, category)">
            <div class="col menu-box" :class="{
              'border-green': category.visible === 1,
              'border-gray': category.visible === 0,
            }">
              <div>
                <i class="bi bi-grip-horizontal me-3"></i>
                <img :src="category.image" :alt="category.name" height="30" class="filtered-image me-2" />
                {{ category.name }}
              </div>

              <div class="btn-group">
                <button class="btn box-menu-action" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true"
                  aria-expanded="false">
                  <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu">
                  <li @click="createProduct(category.category_id)" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <i class="bi bi-plus-lg me-2 ms-2"></i>New Product
                  </li>
                  <li @click="createCategory(category.category_id)" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <i class="bi bi-plus-lg me-2 ms-2"></i>New Sub Category
                  </li>
                  <li @click="
                    viewProducts(category.category_id, category.name)
                    " data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <i class="bi bi-eye me-2 ms-2"></i>View Products
                  </li>
                  <li @click="editCategory(category)" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight">
                    <i class="bi bi-pencil-square me-2 ms-2"></i>Edit
                  </li>
                  <li @click="deleteCategory(category.id)">
                    <i class="bi bi-trash3 me-2 ms-2"></i>Delete
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="category.child.length" class="collapse" :id="'collapse_' + category.category_id">
            <div v-for="childCategory in sortedChildCategories(category.child)" :key="childCategory.category_id"
              class="mb-1 mt-1 box-sub-menu" :class="{
                'border-green': childCategory.visible === 1,
                'border-gray': childCategory.visible === 0,
                'drag-over': childCategory === dragOverChildCategory,
                dragged: childCategory === draggedChildCategory,
              }" draggable="true" @dragstart="dragStartChild($event, childCategory, category)"
              @dragover.prevent="dragOverChild($event, childCategory)" @dragleave="dragLeaveChild"
              @drop="dropChild($event, childCategory, category)">
              <div>
                <i class="bi bi-grip-horizontal me-3"></i>
                <img :src="childCategory.image" :alt="childCategory.name" height="30" class="filtered-image me-2" />
                {{ childCategory.name }}
              </div>
              <div class="btn-group">
                <button class="btn box-menu-action" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true"
                  aria-expanded="false">
                  <i class="bi bi-three-dots-vertical"></i>
                </button>
                <ul class="dropdown-menu">
                  <li @click="
                    viewProducts(
                      childCategory.category_id,
                      childCategory.name
                    )
                    " data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <i class="bi bi-eye me-2 ms-2"></i>View Products
                  </li>

                  <li @click="editCategory(childCategory)" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight">
                    <i class="bi bi-pencil-square me-2 ms-2"></i>Edit
                  </li>

                  <li @click="deleteCategory(childCategory.id)">
                    <i class="bi bi-trash3 me-2 ms-2"></i>Delete
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <a-spin :spinning="loading">
            <button @click="fetchData" data-bs-toggle="modal" data-bs-target="#previewTemplate" class="pre-button mt-5">
              Preview with Your Template
            </button>
          </a-spin>
        </div>

        <!-- Modal -->
        <div class="modal fade bd-example-modal-lg" id="templateModal" tabindex="-1" role="dialog"
          aria-labelledby="branchModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  {{
                    previewData.length > 0 ? previewData[0].name : "Loading..."
                  }}
                </h5>
                <button type="button" class="close" @click="closeModal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div v-if="previewData.length > 0" style="position: relative; z-index: 2000">
                  <SelectedTemplate :template="previewData" />
                </div>
              </div>
              <div class="modal-footer">
                <button class="update-btn" @click="updateTemplate" role="button">
                  Update Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <a-spin :spinning="fetchCategoryLoading">
          <p v-if="!fetchCategoryLoading">No Found Category</p>
        </a-spin>
      </div>
    </div>

    <OffCanvas id="offcanvasRight" :title="mode == 'edit'
      ? 'Edit'
      : mode == 'createCategory'
        ? 'Create Category'
        : mode == 'createProduct'
          ? 'Create Product'
          : 'Product List'
      " :products="products" :mode="mode" :category="editableCategory" :newCategory="newCategory"
      :allergens="sortedAllergens" :newProduct="newProduct" :categories="categories" @updatedCategory="updateCategory"
      @createdCategory="addCategory" @createdProduct="addProductToCategory" :selectedBranchId="selectedBranchId" :selectedLanguageId="selectedLanguageId" />
  </div>
</template>

<script>
import { computed } from 'vue';
import axios from "axios";
import { Modal } from "bootstrap";
import OffCanvas from "@/components/OffCanvas.vue";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Link,
  Underline,
} from "ckeditor5";
import { useAuthStore } from "@/stores/authStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { useBranchStore } from "@/stores/branchStore";
import { toast } from "vue3-toastify";
import SelectedTemplate from "../Templates/SelectedTemplate.vue";
import { useI18n } from 'vue-i18n';
import "ckeditor5/ckeditor5.css";
import "../../assets/css/views/CategoryMenuDetails.css";

export default {
  name: "CategoryMenuDetails",
  components: {
    OffCanvas,
    SelectedTemplate,
  },
  setup() {
    const branchStore = useBranchStore();
    const authStore = useAuthStore();
    const { locale } = useI18n();

    const selectedLanguageId = computed(() => {
      if (locale.value === 'en') {
        return 0;
      } else if (locale.value === 'tr') {
        return 1;
      }
      return 0; // default or fallback
    });

    return {
      branchStore,
      authStore,
      currentLanguage: locale,
      selectedLanguageId
    };
  },
  data() {
    return {
      categoryStore: useCategoryStore(),
      store: useBranchStore(),
      editor: ClassicEditor,
      allergens: [],
      selectedTemplateId: 0,
      currentLanguageId: 0,
      categories: [],
      editableCategory: {},
      products: [],
      sendCategory: [],
      previewData: [],
      mode: "",
      draggedCategory: null,
      dragOverCategory: null,
      draggedChildCategory: null,
      dragOverChildCategory: null,
      parentId: null,
      categoryId: null,
      fetchCategoryLoading: false,
      loading: false,
      editorConfig: {
        plugins: [
          Bold,
          Essentials,
          Italic,
          Mention,
          Paragraph,
          Undo,
          Link,
          Underline,
        ],
        toolbar: ["undo", "redo", "|", "bold", "italic", "link", "underline"],

        mention: {
          // Mention configuration
        },
      },
      newProduct: {
        image: "",
        video: "",
        is_new_product: "",
        sort_order: 1,
        category_id: 0,
        name: "",
        desc: "",
        allergen_id: 0,
      },
      newCategory: {
        group_id: this.$route.params.id,
        parent_id: 0,
        image: "",
        sort_order: 1,
        is_new_category: true,
        description: "",

        descriptions: [{ language_id: 0, name: "" }],
      },
      categoryModal: null,
    };
  },

  computed: {
    sortedCategories() {

      return [...this.categories]
        .sort((a, b) => a.sort_order - b.sort_order)
        .filter((item) => item.language_id == this.selectedLanguageId);
    },
    sortedAllergens(){
      return [...this.allergens]
      .filter((item) => item.language_id == this.selectedLanguageId)
      .map(allergen => ({
        value: allergen.allergen_id,
      label: allergen.name

    }));
    },
    selectedBranchId() {
      return this.branchStore.selectedBranchId;
    },
  },
  methods: {
    closeModal() {
      this.$nextTick(() => {
        const modalElement = document.getElementById("templateModal");
        if (modalElement) {
          const modal = Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
      });
    },
    updateTemplate() {
      // Navigate to the new route
      this.$router.push({ path: "/template-settings", query: { id: this.selectedTemplateId.id } });

      // Close the modal after navigation
      this.$nextTick(() => {
        const modalElement = document.getElementById("templateModal");
        if (modalElement) {
          const modal = Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        }
      });
    },
    getAllergens() {
      axios.get(`https://panel.dinelim.ai/api/allergen`).then((response) => {
        this.allergens = response.data;
      });
    },
    viewProducts(categoryId) {
      console.log(categoryId)
      this.mode = "list";
      axios
        .get(`https://panel.dinelim.ai/api/product/${categoryId}`)
        .then((response) => {
          this.products = response.data.filter(
            (product) =>
              product.branch_id == this.branchStore.selectedBranchId &&
              product.language_id == this.selectedLanguageId
          );
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
        });
    },
    editCategory(category) {
      this.mode = "edit";
      this.editableCategory = category;
    },
    updateCategory(category) {
      this.sendCategory.push(category);

      axios
        .put(
          "https://panel.dinelim.ai/api/product-category/update",
          this.sendCategory
        )
        .then((response) => {
          console.log(response);
          toast.success("Category updated!");
          this.$router.go();
        });
    },
    toggleCollapse(category) {
      category.showChildren = !category.showChildren;
    },
    createCategory(parentId) {
      this.mode = "createCategory";
      this.parentId = parentId;
    },
    createProduct(categoryId) {
      this.mode = "createProduct";
      this.newProduct.category_id = categoryId;
      console.log(this.newProduct);
      this.categoryId = categoryId;
    },
    addCategory(category) {
      console.log(this.parentId);
      category.parent_id = this.parentId;
      axios
        .post("https://panel.dinelim.ai/api/product-category", category)
        .then((response) => {
          this.categories = response.data.map((category) => ({
            ...category,
            showChildren: false,
          }));
          this.$router.go();
          this.resetForm();
        })
        .catch((error) => {
          console.error("Error adding category:", error);
        });
    },
    addProductToCategory(product) {
      console.log(product);

      axios
        .post("https://panel.dinelim.ai/api/product", product)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error adding category:", error);
        });
    },

    sortedChildCategories(childCategories) {
      return [...childCategories].sort((a, b) => a.sort_order - b.sort_order).filter((item) => item.language_id == this.selectedLanguageId);
    },
    fetchData() {
      this.loading = true;
      try {
        axios
          .get("https://panel.dinelim.ai/api/template")
          .then((response) => {
            this.previewData = response.data.filter((item) => item.user_id == this.authStore.getUser.id)
            this.selectedTemplateId = response.data.filter((item) => item.user_id == this.authStore.getUser.id)[0];
            const modal = new Modal(document.getElementById("templateModal"));
            modal.show();
          })
      }
      catch (error) {
        alert("Failed to fetch data.");
        console.error("File upload error:", error);
      } finally {
        this.loading = false; // Hide spinner
      }

    },
    resetForm() {
      this.newCategory = {
        group_id: this.$route.params.id,
        parent_id: 0,
        image: "",
        sort_order: 1,
        is_new_category: true,

        descriptions: [{ language_id: 0, name: "" }],
      };
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
      const draggedIndex = this.categories.findIndex(
        (c) => c.category_id === this.draggedCategory.category_id
      );
      const droppedIndex = this.categories.findIndex(
        (c) => c.category_id === category.category_id
      );


      this.categories.splice(draggedIndex, 1); 
      this.categories.splice(droppedIndex, 0, this.draggedCategory); 


      const categorySortMap = new Map(); 
      let currentSortOrder = 1;

      this.categories.forEach((cat) => {
        if (!categorySortMap.has(cat.category_id)) {
          categorySortMap.set(cat.category_id, currentSortOrder);
          currentSortOrder++;
        }
        cat.sort_order = categorySortMap.get(cat.category_id);
      });

  
      axios
        .put(`https://panel.dinelim.ai/api/product-category/update`, this.categories)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("API request failed:", error);
        });

      console.log(this.categories);
      this.draggedCategory = null;
      this.dragOverCategory = null;
    },

    dragStartChild(event, childCategory, parentCategory) {
      this.draggedChildCategory = childCategory;
      this.draggedParentCategory = parentCategory;
    },
    dragOverChild(event, childCategory) {
      this.dragOverChildCategory = childCategory;
    },
    dragLeaveChild() {
      this.dragOverChildCategory = null;
    },
    dropChild(event, childCategory, parentCategory) {
      if (
        this.draggedParentCategory.category_id !== parentCategory.category_id
      ) {
        // Handle cross-parent category dragging if needed
        return;
      }

      const draggedIndex = parentCategory.child.findIndex(
        (c) => c.category_id === this.draggedChildCategory.category_id
      );
      const droppedIndex = parentCategory.child.findIndex(
        (c) => c.category_id === childCategory.category_id
      );

      // Swap the child categories in the array
      parentCategory.child.splice(draggedIndex, 1); // Remove dragged category
      parentCategory.child.splice(droppedIndex, 0, this.draggedChildCategory); // Insert dragged category at dropped position

      // Update sort_order based on array index
      parentCategory.child.forEach((cat, index) => {
        cat.sort_order = index + 1; // Set sort_order starting from 1
      });

      // Update the backend with the new order
      axios
        .put(
          `https://panel.dinelim.ai/api/product-category/update`,
          parentCategory.child
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error updating category order:", error);
        });

      console.log(parentCategory.child);
      this.draggedChildCategory = null;
      this.dragOverChildCategory = null;
    },
    deleteCategory(categoryId) {
      axios
        .delete(`https://panel.dinelim.ai/api/product-category/${categoryId}`)
        .then(() => {
          this.categories = this.categories.filter(
            (category) => category.category_id !== categoryId
          );
          toast.success("Category deleted!");
          this.$router.go();
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    },
  },
  mounted() {
    const id = this.$route.params.id;
    this.getAllergens();
    this.fetchCategoryLoading = true;
    axios
      .get(`https://panel.dinelim.ai/api/product-category/${id}`)
      .then((response) => {
        this.categories = response.data.map((category) => ({
          ...category,
          showChildren: false,
        }));
        this.fetchCategoryLoading = false;
        console.log( this.categories)
        // Filter categories based on selectedBranchId and assign the result back to this.categories
        this.categories = this.categories.filter(
          (item) => item.branch_id == this.branchStore.selectedBranchId
        );
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  },
};
</script>
