<template>
    <div id="app">
        <div class="template">
            <div class="template-rows">
                <div class="template-item" :class="{ selected: selectedTemplate === 'Template1' }"
                    @click="selectTemplate('Template1')">
                    <Template1 :mainBgColor="selectedBgColor" :secondaryBgColor="secondaryBgColor"
                        :textColor="textColor" :logoSize="'70px'" :iconSize="IconSize" :layout="layout"
                        :logoUrl="logoUrl" :mediaUrl="mediaUrl" :fontSize="fontSize" />
                    <div class="checkbox" v-if="selectedTemplate === 'Template1'">
                        <i class="bi bi-check-circle-fill"></i>
                    </div>
                </div>
                <div class="template-item" :class="{ selected: selectedTemplate === 'Template2' }"
                    @click="selectTemplate('Template2')">
                    <Template1 :mainBgColor="selectedBgColor" :secondaryBgColor="secondaryBgColor"
                        :textColor="textColor" :logoSize="'70px'" :iconSize="IconSize" :layout="layout"
                        :logoUrl="logoUrl" :mediaUrl="mediaUrl" :fontSize="fontSize" />
                    <div class="checkbox" v-if="selectedTemplate === 'Template2'">
                        <i class="bi bi-check-circle-fill"></i>
                    </div>
                </div>
                <div class="template-item" :class="{ selected: selectedTemplate === 'Template3' }"
                    @click="selectTemplate('Template3')">
                    <Template1 :mainBgColor="selectedBgColor" :secondaryBgColor="secondaryBgColor"
                        :textColor="textColor" :logoSize="'70px'" :iconSize="IconSize" :layout="layout"
                        :logoUrl="logoUrl" :mediaUrl="mediaUrl" :fontSize="fontSize" />
                    <div class="checkbox" v-if="selectedTemplate === 'Template3'">
                        <i class="bi bi-check-circle-fill"></i>
                    </div>
                </div>
                <div class="template-item" :class="{ selected: selectedTemplate === 'Template4' }"
                    @click="selectTemplate('Template4')">
                    <Template1 :mainBgColor="selectedBgColor" :secondaryBgColor="secondaryBgColor"
                        :textColor="textColor" :logoSize="'70px'" :iconSize="IconSize" :layout="layout"
                        :logoUrl="logoUrl" :mediaUrl="mediaUrl" :fontSize="fontSize" />
                    <div class="checkbox" v-if="selectedTemplate === 'Template4'">
                        <i class="bi bi-check-circle-fill"></i>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="selectedTemplate" class="mt-5">

            <TemplateSettings @save-settings="handleSaveSettings" :selectedTemplateId="selectedTemplateId"
                :template="selectedTemplate" />
            <div class="d-flex justify-content-end">
                <!-- HTML !-->
                <router-link to="/home" class="ai-btn" role="button"><span class="text">Continue <i
                            class="bi bi-forward-fill"></i></span></router-link>

            </div>
        </div>
        <div v-else>
            <!-- Optional: Add some message or component to show when no template is selected -->
            <p>Please select a template to preview it here.</p>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import { mapState, mapActions } from 'pinia';
import { useTemplateStore } from '@/stores/templateStore'; // Adjust the path if necessary

import Template1 from "@/views/Templates/template1/Home.vue";
import TemplateSettings from '@/views/TemplateSettings.vue';

import "@/assets/css/views/templates/templateList.css";

export default {
    name: "TemplateListComp",

    components: {
        Template1,
        TemplateSettings
    },
    data() {
        const templateStore = useTemplateStore();
        return {
            selectedTemplateId: 0,
            editMode: false,
            selectedBgColor: "#505095",
            secondaryBgColor: "#fff",
            textColor: "#fff",
            layout: "three", // Default layout
            mediaUrl: "home_bg.jpg", // Store URL for uploaded image or video
            logoUrl: "logo_1000.png",
            IconSize: "70px",
            fontSize: "14px",
            templateStore, // Add the store instance to the data
        };
    },
    computed: {
        ...mapState(useTemplateStore, ['selectedTemplate']), // Map the selectedTemplate state
    },
    methods: {
        ...mapActions(useTemplateStore, ['selectTemplate']),

        handleSaveSettings(settings) {
            if (this.selectedTemplateId === 0) {
                console.log(this.selectedTemplateId);
                axios.post('http://127.0.0.1:8000/api/template', settings)
                    .then(response => {
                        console.log(response);
                        toast.success('Template Saved Successfully!');
                    })
                    .catch(error => {
                        console.error('There was an error adding the category!', error);
                    });
            } else {
                console.log(this.selectedTemplateId);
                axios.put(`http://127.0.0.1:8000/api/template/${this.selectedTemplateId}`, settings)
                    .then(response => {
                        console.log(response);
                        toast.success('Template Updated Successfully!');
                    })
                    .catch(error => {
                        console.error('There was an error updating the template!', error);
                    });
            }
        },


    },
    created() {
        console.log(this.$route.query.id);
        this.selectedTemplateId = this.$route.query.id || 0;
        // this.fetchTemplateData(); // Fetch the template data only if selectedTemplateId is not 0
    },
};
</script>
