<template>
    <div id="app">
        <div class="template">
            <div class="template-setting-area">

                <div class="template-setting-form">
                    <div class="mb-5">
                        <div class="file-template-upload">
                            <span><b>Upload Template</b></span>
                            <label for="file-template-upload" class="custom-file-template-upload">
                                <i class="bi bi-upload"></i>
                                <div>Upload</div>
                                <span>The file type can only be .jpg, .jpeg, and .png.</span>
                            </label>
                            <input type="file" id="file-template-upload" @change="handleFileUpload"
                                accept="image/*,video/*" />
                        </div>
                    </div>
                    <div class="template-setting-main">

                        <div class="file-upload">
                            <span><b>Upload Logo</b></span>
                            <label for="file-upload" class="custom-file-upload">
                                <i class="bi bi-upload"></i>
                                <div>Upload</div>
                                <span>The file type can only be .jpg, .jpeg, and .png.</span>
                            </label>
                            <input type="file" id="file-upload" @change="handleLogoFileUpload"
                                accept="image/*,video/*" />
                        </div>
                        <div class="color-select">
                            <span><b>Select Template Color</b></span>
                            <div class="color-select-item">
                                <span>Background Color</span>
                                <ColorPicker @color-changed="handleSecondaryBgColorChange" />
                            </div>
                            <div class="color-select-item">
                                <span>Accent Color</span>
                                <ColorPicker @color-changed="handleBgColorChange" />
                            </div>
                            <div class="color-select-item">
                                <span>Text Color</span>
                                <ColorPicker @color-changed="handleTextColorChange" />
                            </div>
                        </div>

                    </div>
                    <div class="layout-items">
                        <span><b>Select Menu Layout:</b></span>
                        <span class="d-flex justify-content-between">
                            <button @click="setLayout('two')" :class="{ active: layout === 'two' }">
                                <i class="bi bi-grid-1x2"></i> Two Column
                            </button>
                            <button @click="setLayout('three')" :class="{ active: layout === 'three' }">
                                <i class="bi bi-grid-3x3-gap"></i> Three Column
                            </button>
                        </span>

                    </div>
                    <div class="layout-items">
                        <span><b>Select Font Size:</b></span>
                        <select v-model="fontSize" class="form-select" style="width: 100px;"
                            aria-label="Default select example">
                            <option value="14px" selected>14px</option>
                            <option value="16px">16px</option>
                            <option value="18px">18px</option>

                        </select>
                    </div>
                    <div class="layout-items">
                        <span><b>Select Icon Size:</b></span>
                        <select v-model="IconSize" class="form-select" style="width: 100px;"
                            aria-label="Default select example">

                            <option value="60px">60px</option>
                            <option value="70px">70px</option>
                            <option value="80px">80px</option>
                            <option value="100px">100px</option>
                            <option value="120px">120px</option>
                        </select>
                    </div>
                    <div class="layout-items">
                        <span><b>Select Languages:</b></span>
                        <select v-model="selectedLanguages" class="form-select" multiple style="width: 200px;"
                            aria-label="Select languages">
                            <option value="en">English</option>
                            <option value="fr">French</option>
                            <option value="es">Spanish</option>
                            <option value="de">German</option>
                            <option value="it">Italian</option>
                            <option value="tr">Turkish</option>
                        </select>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button class="save-button" @click="saveSettings"> {{ selectedTemplateId == 0 ? 'Save' :
                            'Update' }}</button>
                    </div>
                </div>


            </div>
            <div class="template-preview">
                <div class="template-border">

                    <component :is="template" :mainBgColor="selectedBgColor" :secondaryBgColor="secondaryBgColor"
                        :textColor="textColor" :logoSize="'120px'" :iconSize="IconSize" :layout="layout"
                        :logoUrl="logoUrl" :mediaUrl="mediaUrl" :fontSize="fontSize" />

                </div>
            </div>

        </div>


    </div>
</template>
<script>
import axios from 'axios';
import Template1 from "./Templates/template1/Home.vue";
import ColorPicker from "../components/ColorPickerComp.vue";
import "../assets/css/views/templates/templateSettings.css";

export default {
    name: "TemplateSettingsComp",
    components: {
        ColorPicker,
        Template1,
    },
    props: {
        template: String,
        selectedTemplateId: Number
    },
    data() {
        return {
            selectedBgColor: "#505095",
            selectedLanguages: [],
            secondaryBgColor: "#fff",
            textColor: "#fff",
            layout: "three", // Default layout
            mediaUrl: 'home_bg.jpg', // Store URL for uploaded image or video
            logoUrl: 'logo_1000.png',
            IconSize: '120px',
            fontSize: '14px',
        };
    },
    methods: {
        fetchTemplateData() {
            if (this.selectedTemplateId !== 0) {
                axios.get(`https://panel.dinelim.ai/api/template/${this.selectedTemplateId}`)
                    .then(response => {
                        const templateData = response.data[0]; // Assuming the response is an array with one object
                        if (templateData) {
                            const colors = JSON.parse(templateData.color);
                            const colorsMap = colors.reduce((acc, color) => {
                                acc[color.name] = color.value;
                                return acc;
                            }, {});



                            this.selectedBgColor = colorsMap.selectedBgColor || this.selectedBgColor;
                            this.secondaryBgColor = colorsMap.secondaryBgColor || this.secondaryBgColor;
                            this.textColor = colorsMap.textColor || this.textColor;
                            this.layout = templateData.layout || this.layout;
                            this.mediaUrl = templateData.banner || this.mediaUrl;
                            this.logoUrl = templateData.logo || this.logoUrl;
                            this.IconSize = templateData.size || this.IconSize;

                            // Any other data processing as needed
                        }
                    })
                    .catch(error => {
                        console.error('There was an error fetching the template data!', error);
                    });
            }
        },
        handleBgColorChange(newColor) {
            this.selectedBgColor = newColor;
        },
        handleSecondaryBgColorChange(newColor) {
            this.secondaryBgColor = newColor;
        },
        handleTextColorChange(newColor) {
            this.textColor = newColor;
        },
        setLayout(newLayout) {
            this.layout = newLayout;
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            console.log(file)
            if (file) {

                this.mediaUrl = file.name; // Create a URL for the uploaded file
                console.log(this.mediaUrl)
            }
        },
        handleLogoFileUpload(event) {
            const file = event.target.files[0];
            console.log(file)
            if (file) {

                this.logoUrl = file.name; // Create a URL for the uploaded file

            }
        },
        saveSettings() {
            // Emit an event with the form data
            this.$emit('save-settings', {
                languages: this.selectedLanguages,
                color: [
                    { name: 'selectedBgColor', value: this.selectedBgColor },
                    { name: 'secondaryBgColor', value: this.secondaryBgColor },
                    { name: 'textColor', value: this.textColor }
                ],
                layout: this.layout,
                banner: this.mediaUrl,
                logo: this.logoUrl,
                size: this.IconSize,
                name: this.template
            });
        },
    },
    created() {

        this.fetchTemplateData();
    },
};
</script>
