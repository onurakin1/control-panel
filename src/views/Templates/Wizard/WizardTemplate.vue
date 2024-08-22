<template>
    <div class="wizard-container d-flex flex-column justify-content-center align-items-center">
        <form @submit.prevent="submitForm">
            <div class="wizard-form" v-show="step === 1">
                <div class="d-flex justify-content-start">
                    <img src="https://panel.dinelim.ai/uploads/images/1723724999_Limonist-Meta.png"
                        style="max-width: 100px;" />
                </div>
                <div class="d-flex justify-content-start mt-5">
                    <h3>Hello {{ authStore.getUser.name }}!</h3>
                </div>
                <div class="row mt-5">
                    <div class="col-md-5">
                        <div class="mb-3 wizard-form-item">
                            <label for="languages" class="form-label">Select Languages:</label><br />
                            <a-select id="languages" mode="multiple" :options="options" v-model:value="form.selectedLanguages"
                                placeholder="Select items" style="width: 200px" />
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
                            <label for="logo" class="form-label">Company Name</label><br/>
                            <input type="text" v-model="form.company_name" />
                        </div>
                        <div class="layout-items mb-3">
                            <span>Select Menu Layout:</span><br/>
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
                        <div class="template-border">
                            <Template1 :selectedLanguage="form.selectedLanguages" :mediaUrl="form.banner"
                                :logoUrl="form.logo" :logoSize="'80px'" :iconSize="'80px'" :layout="form.layout" />
                        </div>
                    </div>
                </div>
         <div class="d-flex justify-content-start mt-5">
            <button type="button" @click="nextStep">İleri</button>
            </div>

                
            </div>
            <div class="wizard-form" v-show="step === 2">
                <h2>Adım 2</h2>
                <p>Bu ikinci adımdır.</p>
                <button type="button" @click="prevStep">Geri</button>
                <button type="button" @click="nextStep">İleri</button>
            </div>
            <div class="wizard-form" v-show="step === 3">
                <h2>Adım 3</h2>
                <p>Bu üçüncü adımdır.</p>
                <button type="button" @click="prevStep">Geri</button>
                <button type="submit">Tamamla</button>
            </div>
        </form>
    </div>
</template>


<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import "@/assets/css/views/templates/wizard.css"
import Template1 from "../template1/Home.vue";
import axios from 'axios'; // Ensure axios is imported

export default {
    name: 'WizardComponent',
    components: {
        Template1
    },
    setup() {
        const step = ref(1);
        const authStore = useAuthStore();
        const form = ref({
            banner: 'home_bg.jpg',
            logo: null,
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
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                form.value.logo = response.data.filePath;
            } catch (error) {
                console.error("File upload error:", error);
            }
        };

        const resetFile = () => {
            form.value.logo = null;
        };

        const submitForm = () => {
            alert('Form submitted!');
            // Handle form submission logic here
        };

        const nextStep = () => {
            if (step.value < 4) {
                step.value++;
            }
        };

        const prevStep = () => {
            if (step.value > 1) {
                step.value--;
            }
        };

        const completeWizard = () => {
            alert('Wizard tamamlandı!');
        };

        const setLayout = (layout) => {
            form.value.layout = layout;
        };

        return {
            step,
            nextStep,
            prevStep,
            completeWizard,
            submitForm,
            authStore,
            options,
            onFileChangeLogo,
            form,
            toggler,
            resetFile,
            setLayout
        };
    }
};
</script>
