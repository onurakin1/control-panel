<template>
    <div class="offcanvas offcanvas-end" tabindex="-1" :id="id" aria-labelledby="offcanvasLabel">
        <div class="offcanvas-header">
            <h5 :id="id + 'Label'">{{ title }}</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <slot>
                <div v-if="mode === 'edit'">
                    <form @submit.prevent="handleEditFormSubmit">
                        <div class="mb-3">
                            <label for="category_name" class="form-label">Category Name</label>
                            <input type="text" v-model="editForm.category_name" class="form-control" id="category_name">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <ckeditor :editor="editor" v-model="editForm.description" :config="editorConfig"></ckeditor>
                        </div>
                        <div class="mb-3 d-flex w-100 gap-20">
                            <div>
                                <label for="image" class="form-label">Image</label>

                                <div v-if="editForm.image">
                                    <div class="photo-area">
                                        <div class="polaroid">
                                            <div class="img-container" @click="toggler = !toggler">
                                                <img :src="editForm.image" class="image filtered-image"
                                                    style="width:100%">
                                                <div class="middle">
                                                    <div class="text"><i class="bi bi-eye me-2"></i>Preview</div>
                                                </div>
                                            </div>
                                            <div class="container">
                                                <i class="bi bi-trash3"></i>
                                            </div>
                                        </div>
                                        <FsLightbox :toggler="toggler" :sources="[editForm.image]" />
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="upload-image">
                                        <i class="bi bi-upload"></i>
                                        <p>Upload</p>
                                        <span>The file type can only be .jpg, .jpeg, and .png.</span>
                                    </div>
                                </div>
                            </div>
                            <div class="video-area">
                                <label for="video" class="form-label">Video</label>
                                <div v-if="editForm.video"></div>
                                <div v-else>
                                    <div class="upload-image">
                                        <i class="bi bi-upload"></i>
                                        <p>Upload</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="visible" class="form-label">Visible</label>
                            <select v-model="editForm.visible" class="form-control" id="visible">
                                <option :value="1">Yes</option>
                                <option :value="0">No</option>
                            </select>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
                <div v-else-if="mode === 'createMenu'">
                    <form @submit.prevent="handleCreateMenuFormSubmit">
                        <div class="mb-3">
                            <label for="descriptions" class="form-label">Name</label>
                            <div class="mb-2">
                                <input type="text" class="form-control mb-3" v-model="createMenuForm.name"
                                    placeholder="Name" required>
                                <label for="descriptions" class="form-label">Select Language</label>
                                <select class="form-select mb-1" v-model="createMenuForm.language_id" required>
                                    <option value="0">English</option>
                                    <option value="1">Russian</option>
                                    <option value="2">Turkish</option>
                                    <!-- Add more options as needed -->
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="image" class="form-label">Image</label>
                            <div class="d-flex justify-content-between">
                                <div class="dropdown">
                                    <button class="upload-image" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img src="~@/assets/img/icons/cat_1.png" width="32px"> <i
                                            class="bi bi-upload"></i>
                                        <p>Upload</p>
                                        <span>The file type can only be .jpg, .jpeg, and .png.</span>
                                    </button>
                                    <div class="dropdown-menu icon-menu">
                                        <div class="image-list" v-if="icons.length">
                                            <div v-for="(icon, index) in icons" :key="index" class="icon-item">
                                                <img :src="icon" alt="Icon" @click="selectMenuImage(icon)" />
                                            </div>
                                        </div>
                                        <div v-else>
                                            <p>No icons found.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="photo-area" v-if="createMenuForm.image">
                                    <div class="polaroid">
                                        <div class="img-container" @click="toggler = !toggler">
                                            <img :src="createMenuForm.image" class="image filtered-image"
                                                style="width:100%">
                                            <div class="middle">
                                                <div class="text"><i class="bi bi-eye me-2"></i>Preview</div>
                                            </div>
                                        </div>
                                        <div class="container">
                                            <i class="bi bi-trash3"></i>
                                        </div>
                                    </div>
                                    <FsLightbox :toggler="toggler" :sources="[createMenuForm.image]" />
                                </div>
                                <div v-else>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
                <div v-else-if="mode === 'editMenu'">
                    <form @submit.prevent="handleEditMenuFormSubmit">

                        <div class="mb-3">
                            <label for="name" class="form-label">Menu Name</label>
                            <input type="text" v-model="this.editMenuForm.name" class="form-control" id="name">
                        </div>

                        <div class="mb-3 d-flex w-100 gap-20">
                            <div>
                                <label for="image" class="form-label">Image</label>

                                <div v-if="this.editMenuForm.image">
                                    <div class="photo-area">
                                        <div class="polaroid">
                                            <div class="img-container" @click="toggler = !toggler">
                                                <img :src="this.editMenuForm.image" class="image filtered-image"
                                                    style="width:100%">
                                                <div class="middle">
                                                    <div class="text"><i class="bi bi-eye me-2"></i>Preview</div>
                                                </div>
                                            </div>
                                            <div class="container">
                                                <i class="bi bi-trash3"></i>
                                            </div>
                                        </div>
                                        <FsLightbox :toggler="toggler" :sources="[this.editMenuForm.image]" />
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="upload-image">
                                        <i class="bi bi-upload"></i>
                                        <p>Upload</p>
                                        <span>The file type can only be .jpg, .jpeg, and .png.</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
                <div v-else-if="mode === 'createCategory'">
                    <form @submit.prevent="handleCreateCategoryFormSubmit">
                        <div class="mb-3">
                            <label for="descriptions" class="form-label">Name</label>
                            <div v-for="(description, index) in createCategoryForm.descriptions" :key="index"
                                class="mb-2">
                                <input type="text" class="form-control mb-3" v-model="description.name"
                                    placeholder="Name" required>
                                <label for="descriptions" class="form-label">Select Language</label>
                                <select class="form-select mb-1" v-model="description.language_id" required>
                                    <option value="0">English</option>
                                    <option value="1">Russian</option>
                                    <option value="2">Turkish</option>
                                    <!-- Add more options as needed -->
                                </select>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="image" class="form-label">Image</label>
                            <div class="d-flex justify-content-between">
                                <div class="dropdown">
                                    <button class="upload-image" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img src="~@/assets/img/icons/cat_1.png" width="32px"> <i
                                            class="bi bi-upload"></i>
                                        <p>Upload</p>
                                        <span>The file type can only be .jpg, .jpeg, and .png.</span>
                                    </button>
                                    <div class="dropdown-menu icon-menu">
                                        <div class="image-list" v-if="icons.length">
                                            <div v-for="(icon, index) in icons" :key="index" class="icon-item">
                                                <img :src="icon" alt="Icon" @click="selectImage(icon)" />
                                            </div>
                                        </div>
                                        <div v-else>
                                            <p>No icons found.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="photo-area" v-if="createCategoryForm.image">
                                    <div class="polaroid">
                                        <div class="img-container" @click="toggler = !toggler">
                                            <img :src="createCategoryForm.image" class="image filtered-image"
                                                style="width:100%">
                                            <div class="middle">
                                                <div class="text"><i class="bi bi-eye me-2"></i>Preview</div>
                                            </div>
                                        </div>
                                        <div class="container">
                                            <i class="bi bi-trash3"></i>
                                        </div>
                                    </div>
                                    <FsLightbox :toggler="toggler" :sources="[createCategoryForm.image]" />
                                </div>
                                <div v-else>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <ckeditor :editor="editor" v-model="createCategoryForm.description" :config="editorConfig">
                            </ckeditor>
                        </div>
                        <div class="mb-3">
                            <label for="is_new_category" class="form-label">Is New Category</label>
                            <input type="checkbox" class="form-check-input" id="is_new_category"
                                v-model="createCategoryForm.is_new_category">
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
                <div v-else-if="mode === 'createProduct'">
                    <form @submit.prevent="handleCreateProductFormSubmit">
                        <div class="mb-3">
                            <label for="name" class="form-label">Name</label>

                            <input type="text" class="form-control mb-3" v-model="createProductForm.name"
                                placeholder="Name" required>


                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <ckeditor :editor="editor" v-model="createProductForm.desc" :config="editorConfig">
                            </ckeditor>
                        </div>
                        <div class="mb-3">
                            <label for="image" class="form-label">Image</label>
                            <div class="d-flex justify-content-between">
                                <div class="dropdown">
                                    <button class="upload-image" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img src="~@/assets/img/icons/cat_1.png" width="32px"> <i
                                            class="bi bi-upload"></i>
                                        <p>Upload</p>
                                        <span>The file type can only be .jpg, .jpeg, and .png.</span>
                                    </button>
                                    <div class="dropdown-menu icon-menu">
                                        <div class="image-list" v-if="icons.length">
                                            <div v-for="(icon, index) in icons" :key="index" class="icon-item">
                                                <img :src="icon" alt="Icon" @click="selectProductImage(icon)" />
                                            </div>
                                        </div>
                                        <div v-else>
                                            <p>No icons found.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="photo-area" v-if="createProductForm.image">
                                    <div class="polaroid">
                                        <div class="img-container" @click="toggler = !toggler">
                                            <img :src="createProductForm.image" class="image filtered-image"
                                                style="width:100%">
                                            <div class="middle">
                                                <div class="text"><i class="bi bi-eye me-2"></i>Preview</div>
                                            </div>
                                        </div>
                                        <div class="container">
                                            <i class="bi bi-trash3"></i>
                                        </div>
                                    </div>
                                    <FsLightbox :toggler="toggler" :sources="[createProductForm.image]" />
                                </div>
                                <div v-else>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="category" class="form-label">Category</label>
                            <select class="form-select" id="categorySelect" v-model="createProductForm.category_id">
                                <option v-for="category in categories" :key="category.category_id"
                                    :value="category.category_id">
                                    {{ category.category_name }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="allergen" class="form-label">Content Warnings</label>
                            <select class="form-select" id="allergenSelect" v-model="createProductForm.allergen_id">
                                <option v-show="allergen.language_id == 1" v-for="allergen in allergens"
                                    :key="allergen.allergen_id" :value="allergen.allergen_id">
                                    {{ allergen.name }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="is_new_category" class="form-label">Is New Product</label>
                            <input type="checkbox" class="form-check-input" id="is_new_category"
                                v-model="createProductForm.is_new_category">
                        </div>

                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
                <div v-else>
                    <div v-if="products.length > 0">
                        <div v-for="product in products" :key="product.id" class="blog-card">
                            <div class="meta">
                                <div class="photo" :style="{ backgroundImage: 'url(' + product.image + ')' }"></div>
                                <ul class="details">
                                    <li class="author"><a href="#"><i class="bi bi-eye ms-2"></i>Preview</a></li>
                                    <li class="date">Aug. 24, 2015</li>
                                    <li class="tags">
                                        <ul>
                                            <li><a href="#">Milk</a></li>
                                            <li><a href="#">Eggs</a></li>
                                            <li><a href="#">Peanut</a></li>
                                            <li><a href="#">Soybean</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div class="description">
                                <h2>{{ product.name }}</h2>

                                <p class="read-more">
                                    <a href="#">Read More</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <p v-else>No products found.</p>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import FsLightbox from "fslightbox-vue/v3";
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Link, Underline, Heading } from 'ckeditor5';
import icons from '../utils/importIcons';
import "../assets/css/comps/OffCanvas.css";

export default {
    name: "OffCanvas",
    props: {
        id: String,
        title: String,
        mode: {
            type: String,
            default: 'edit'
        },
        products: {
            type: Array,
            required: true,
        },
        allergens: {
            type: Array,
            required: true,
        },
        categories: {
            type: Array,
            required: true,
        },
        category: {
            type: Object,
            required: true,
        },
        newCategory: {
            type: Object,
            required: true,
        },
        newProduct: {
            type: Object,
            required: true,
        },
        newMenu: {
            type: Object,
            required: true,
        },
        editMenu: {
            type: Object,
            required: true,
        }
    },
    components: { FsLightbox },
    data() {
        return {
            editor: ClassicEditor,
            editForm: { ...this.category },
            editMenuForm: { ...this.editMenu },
            createCategoryForm: { ...this.newCategory },
            createProductForm: { ...this.newProduct },
            createMenuForm: { ...this.newMenu },
            toggler: false,
            selectedCategory: '',
            editorConfig: {
                plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo, Link, Underline, Heading],
                toolbar: ['undo', 'redo', '|', 'bold', 'italic', 'link', 'underline', 'heading'],
            },
            icons: icons,
        };
    },
    watch: {
        editMenu: {
            immediate: true,
            handler(newValue) {
                this.editMenuForm = { ...newValue };

            }
        },
        category: {
            immediate: true,
            handler(newValue) {
                this.editForm = { ...newValue };

            }
        }
    },
    methods: {
        handleEditFormSubmit() {
            this.$emit('updatedCategory', this.editForm);
        },
        handleEditMenuFormSubmit() {
            this.$emit('updatedMenu', this.editMenuForm);
        },
        handleCreateCategoryFormSubmit() {
            this.$emit('createdCategory', this.createCategoryForm);
        },
        handleCreateMenuFormSubmit() {
            this.$emit('createdMenu', this.createMenuForm);
        },
        handleCreateProductFormSubmit() {
            this.$emit('createdProduct', this.createProductForm);
        },
        selectProductImage(src) {
            this.createProductForm.image = src;
        },
        selectMenuImage(src) {
            this.createMenuForm.image = src;
        },
        selectImage(src) {
            this.createCategoryForm.image = src;
        },
        selectEditImage(src) {
            this.editForm.image = src;
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>
