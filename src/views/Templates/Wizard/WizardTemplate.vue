<template>
    <div class="wizard-container d-flex flex-column justify-content-center align-items-center">
        <form @submit.prevent="submitForm">
            <!-- Step 1 -->
            <div class="wizard-form" v-show="step === 1">
                <div class="d-flex justify-content-start">
                    <img src="https://panel.dinelim.ai/uploads/images/1723724999_Limonist-Meta.png"
                        style="max-width: 100px;" />
                </div>
                <div class="d-flex justify-content-start mt-5">
                    <h3>Hello {{ authStore.getUser.name }}!</h3>
                </div>
                <div class="row mt-2">
                    <div class="col-md-5">
                        <div class="mb-3 wizard-form-item">
                            <label for="languages" class="form-label">Select Languages:</label><br />
                            <a-select id="languages" mode="multiple" :options="options"
                                v-model:value="form.selectedLanguages" placeholder="Select items"
                                style="width: 200px" />
                        </div>

                        <div class="mb-3 wizard-form-item">
                            <label for="logo" class="form-label">Logo</label>
                            <div v-if="form.logo">
                                <div class="photo-area">
                                    <div class="polaroid">
                                        <div class="img-container" @click="toggler = !toggler">
                                            <img :src="'https://panel.dinelim.ai/uploads/' + form.logo" class="image"
                                                style="width:100%" />
                                        </div>
                                        <div class="container">
                                            <i class="bi bi-trash3" @click="resetFile"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="file-upload">
                                    <label for="file-upload" class="custom-file-upload">
                                        <i class="bi bi-upload"></i>
                                        <div>Upload</div>
                                        <span>The file type can only be .jpg, .jpeg, and .png.</span>
                                    </label>
                                    <input type="file" id="file-upload" @change="onFileChangeLogo"
                                        accept=".jpg, .jpeg, .png" />
                                </div>
                            </div>
                        </div>
                        <div class="mb-3 wizard-form-item">
                            <label for="logo" class="form-label">Company Name</label><br />
                            <a-space direction="vertical" style="width: 52%">
                                <a-input v-model:value="form.company_name" placeholder="Company Name" />
                            </a-space>
                        </div>
                        <div class="layout-items mb-3">
                            <span>Select Menu Layout:</span><br />
                            <span class="d-flex justify-content-between">
                                <div @click="setLayout('two')" :class="{ active: form.layout === 'two' }">
                                    <i class="bi bi-grid-1x2"></i> Two Column
                                </div>
                                <div @click="setLayout('three')" :class="{ active: form.layout === 'three' }">
                                    <i class="bi bi-grid-3x3-gap"></i> Three Column
                                </div>
                            </span>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="template-wizard-border">
                            <Template1 :selectedLanguage="form.selectedLanguages" :mediaUrl="form.banner"
                                :logoUrl="form.logo" :logoSize="'80px'" :iconSize="'80px'" :layout="form.layout" />
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-start mt-2">
                    <button type="button" @click="nextStep">İleri</button>
                </div>
            </div>

            <!-- Step 2 -->
            <div class="wizard-form" v-show="step === 2">
                <div class="d-flex justify-content-start">
                    <img src="https://panel.dinelim.ai/uploads/images/1723724999_Limonist-Meta.png"
                        style="max-width: 100px;" />
                </div>
                <div class="d-flex justify-content-start mt-5">
                    <h3>Hello {{ authStore.getUser.name }}!</h3>
                </div>
                <div class="row mt-2">
                    <div class="col-md-5">
                        <div class="mb-3 wizard-form-item">
                            <label for="logo" class="form-label">Banner</label>
                            <div v-if="form.banner != 'images/1724355186_home_bg.jpg'">
                                <div class="photo-area">
                                    <div class="polaroid">
                                        <div class="img-container" @click="toggler = !toggler">
                                            <img :src="'https://panel.dinelim.ai/uploads/' + form.banner" class="image"
                                                style="width:100%" />
                                        </div>
                                        <div class="container">
                                            <i class="bi bi-trash3" @click="resetBanner"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                <div class="file-upload-banner">
                                    <label for="file-upload-banner" class="custom-file-upload">
                                        <i class="bi bi-upload"></i>
                                        <div>Upload</div>
                                        <span>The file type can only be .jpg, .jpeg, and .png.</span>
                                    </label>
                                    <input type="file" id="file-upload-banner" @change="onFileChangeBanner"
                                        accept=".jpg, .jpeg, .png" />
                                </div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <span>Select Template Color</span>
                            <div class="mb-2 wizard-form-item align-items-center">
                                <span>Background Color</span>
                                <ColorPicker :selectedColor="form.secondaryBgColor"
                                    @color-changed="handleSecondaryBgColorChange" />
                            </div>
                            <div class="mb-2 wizard-form-item align-items-center">
                                <span>Accent Color</span>
                                <ColorPicker :selectedColor="form.selectedBgColor"
                                    @color-changed="handleBgColorChange" />
                            </div>
                            <div class="mb-2 wizard-form-item align-items-center">
                                <span>Text Color</span>
                                <ColorPicker :selectedColor="form.textColor" @color-changed="handleTextColorChange" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-7">
                        <div class="template-wizard-border">
                            <Template1 :selectedLanguage="form.selectedLanguages" :mediaUrl="form.banner"
                                :logoUrl="form.logo" :logoSize="'80px'" :iconSize="'80px'" :layout="form.layout"
                                :mainBgColor="form.selectedBgColor" :secondaryBgColor="form.secondaryBgColor"
                                :textColor="form.textColor" />
                        </div>
                    </div>
                </div>
                <button type="button" @click="prevStep">Geri</button>
                <button type="button" @click="submitForm">Save and Continue</button>
            </div>


        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router'; // Import useRouter
import "@/assets/css/views/templates/wizard.css";
import Template1 from "../template1/Home.vue";
import ColorPicker from "../../../components/ColorPickerComp.vue";
import { useCompanyStore } from '@/stores/companyStore';
import axios from 'axios'; // Ensure axios is imported
import { toast } from "vue3-toastify";

export default {
    name: 'WizardComponent',
    components: {
        Template1,
        ColorPicker
    },
    setup() {
        const step = ref(1);
        const authStore = useAuthStore();
        const compStore = useCompanyStore();
        const router = useRouter(); // Get router instance
        const form = ref({
            banner: 'images/1724355186_home_bg.jpg',
            logo: null,
            secondaryBgColor: '#ffffff',
            selectedBgColor: '#000000',
            textColor: '#333333',
            company_name: null,
            selectedLanguages: [],
            layout: 'two'
        });

        const options = ref([
            { label: 'Arabic', value: 'ar' },
            { label: 'English', value: 'en' },
            { label: 'Turkish', value: 'tr' },
        ]);

        const toggler = ref(false);

        const onFileChangeLogo = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post("https://panel.dinelim.ai/api/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                form.value.logo = response.data.filePath;
            } catch (error) {
                console.error("Error uploading logo:", error);
            }
        };

        const onFileChangeBanner = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await axios.post("https://panel.dinelim.ai/api/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                form.value.banner = response.data.filePath;
                console.log(form.value.banner);
            } catch (error) {
                console.error("Error uploading banner:", error);
            }
        };

        const handleSecondaryBgColorChange = (color) => {
            form.value.secondaryBgColor = color;
        };

        const handleBgColorChange = (color) => {
            form.value.selectedBgColor = color;
        };

        const handleTextColorChange = (color) => {
            form.value.textColor = color;
        };

        const resetFile = () => {
            form.value.logo = null;
        };

        const resetBanner = () => {
            form.value.banner = null;
        };

        const nextStep = () => {
            step.value++;
        };

        const prevStep = () => {
            step.value--;
        };

        const submitForm = async () => {
            try {
                const color = [
                    { name: 'selectedBgColor', value: form.value.selectedBgColor },
                    { name: 'secondaryBgColor', value: form.value.secondaryBgColor },
                    { name: 'textColor', value: form.value.textColor }
                ];

                const payload = {
                    banner: form.value.banner,
                    logo: form.value.logo,
                    color: color,
                    company_name: form.value.company_name,
                    languages: form.value.selectedLanguages,
                    layout: form.value.layout,
                    user_id: authStore.getUser.id,
                    size: '80px',
                    name: 'Template1'
                };

                const response = await axios.post('https://panel.dinelim.ai/api/template', payload);
                compStore.setCompData(response.data.company.logo);
                toast.success("Company and template saved successfully");
                router.push({ name: 'Dashboard' }); // Use router instance to navigate
      
            } catch (error) {
                console.error('An error occurred while sending the form:', error);
            }
        };

        const setLayout = (layout) => {
            form.value.layout = layout;
        };

        return {
            step,
            authStore,
            compStore,
            form,
            options,
            toggler,
            onFileChangeLogo,
            onFileChangeBanner,
            handleSecondaryBgColorChange,
            handleBgColorChange,
            handleTextColorChange,
            resetFile,
            resetBanner,
            nextStep,
            prevStep,
            submitForm,
            setLayout,
        };
    }
};

</script>
