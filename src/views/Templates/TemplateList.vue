<template>
  <div id="app" class="container">
    <swiper class="swiper-width" :slides-per-view="3" :space-between="10" :loop="true" :breakpoints="{
      '640': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '768': {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      '1024': {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      '1440': {
        slidesPerView: 4,
        spaceBetween: 10,
      },
    }">
      <swiper-slide v-for="template in templates" :key="template.id">
        <div class="template-item" :class="{ selected: selectedTemplate === template.name }"
          @click="selectTemplate(template.name)">
          <Template1 :disabled="true" :mainBgColor="selectedBgColorDefault" :secondaryBgColor="secondaryBgColorDefault"
            :textColor="textColorDefault" :logoSize="'40px'" :iconSize="IconSizeDefault" :layout="layoutDefault"
            :logoUrl="compStore.company" :mediaUrl="mediaUrlDefault" :fontSize="fontSizeDefault" />
          <div class="checkbox" v-if="selectedTemplate === template.name">
            <i class="bi bi-check-circle-fill"></i>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div v-if="selectedTemplate" class="mt-5 template-list">
      <TemplateSettings @save-settings="handleSaveSettings" :selectedTemplateId="selectedTemplateId"
        :template="selectedTemplate" :selectedBgColor="selectedBgColor" :secondaryBgColor="secondaryBgColor"
        :textColor="textColor" :layout="layout" :mediaUrl="mediaUrl" :logoUrl="compStore.company" :IconSize="IconSize"
        :selectedLanguages="selectedLanguages" />
   
    </div>
    <div v-else>
      <!-- Optional: Add some message or component to show when no template is selected -->
      <p>Please select a template to preview it here.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import { mapState, mapActions } from "pinia";
import { useTemplateStore } from "@/stores/templateStore"; 
import { useAuthStore } from '@/stores/authStore';
import { useCompanyStore } from '@/stores/companyStore';
import { Swiper, SwiperSlide } from "swiper/vue";
import Template1 from "@/views/Templates/template1/Home.vue";
import TemplateSettings from "@/views/TemplateSettings.vue";

import "@/assets/css/views/templates/templateList.css";
import "swiper/css";

export default {
  name: "TemplateListComp",

  components: {
    Template1,
    TemplateSettings,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const authStore = useAuthStore();
    const templateStore = useTemplateStore();
    const compStore = useCompanyStore();

    return {
      authStore,
      templateStore,
      compStore
    };
  },
  data() {

    return {
      selectedTemplateId: 0,
      editMode: false,
      selectedBgColorDefault: "#505095",
      secondaryBgColorDefault: "#fff",
      textColorDefault: "#fff",
      layoutDefault: "three", // Default layout
      mediaUrlDefault: "home_bg.jpg", // Store URL for uploaded image or video
      logoUrlDefault: "logo_1000.png",
      IconSizeDefault: "40px",
      fontSizeDefault: "14px",
      templates: [
        { id: 1, name: "Template1" },

      ],

      selectedBgColor: "#505095",
      selectedLanguages: [],
      secondaryBgColor: "#fff",
      textColor: "#fff",
      layout: "three", // Default layout
      mediaUrl: "home_bg.jpg", // Store URL for uploaded image or video
      logoUrl: "logo_1000.png",
      IconSize: "120px",
      fontSize: "14px",

    };
  },
  computed: {
    ...mapState(useTemplateStore, ["selectedTemplate"]), // Map the selectedTemplate state
  },
  methods: {
    fetchTemplateData() {
      if (this.selectedTemplateId !== 0) {
        console.log(this.selectedTemplateId);
        axios
          .get(
            `https://panel.dinelim.ai/api/template/${this.selectedTemplateId}`
          )
          .then((response) => {
            const templateData = response.data[0]; // Assuming the response is an array with one object
            if (templateData) {
              const colors = JSON.parse(templateData.color);
              const colorsMap = colors.reduce((acc, color) => {
                acc[color.name] = color.value;
                return acc;
              }, {});

              const languages = JSON.parse(templateData.languages);
              // Use the action to set the selected template
              this.selectTemplate(templateData.name);

              // Update properties for TemplateSettings
              this.selectedBgColor =
                colorsMap.selectedBgColor || this.selectedBgColor;
              this.secondaryBgColor =
                colorsMap.secondaryBgColor || this.secondaryBgColor;
              this.textColor = colorsMap.textColor || this.textColor;
              this.layout = templateData.layout || this.layout;
              this.mediaUrl = templateData.banner || this.mediaUrl;
              this.logoUrl = templateData.logo || this.logoUrl;
              this.IconSize = templateData.size || this.IconSize;
              this.selectedLanguages = languages || this.selectedLanguages;

              // Any other data processing as needed
            }
          })
          .catch((error) => {
            console.error(
              "There was an error fetching the template data!",
              error
            );
          });
      }
    },
    ...mapActions(useTemplateStore, ["selectTemplate"]),

    handleSaveSettings(settings) {
      if (this.selectedTemplateId === 0) {
        settings.user_id = this.authStore.user.id;

        axios
          .post("https://panel.dinelim.ai/api/template", settings)
          .then((response) => {
            console.log(response);
            toast.success("Template Saved Successfully!");
          })
          .catch((error) => {
            console.error("There was an error adding the category!", error);
          });
      } else {

        settings.user_id = this.authStore.user.id
        axios
          .put(
            `https://panel.dinelim.ai/api/template/${this.selectedTemplateId}`,
            settings
          )
          .then((response) => {
            console.log(response);
            toast.success("Template Updated Successfully!");
          })
          .catch((error) => {
            console.error("There was an error updating the template!", error);
          });
      }
    },
  },
  created() {
    console.log(this.$route.query.id);

    this.selectedTemplateId = this.$route.query.id || 0;
    this.fetchTemplateData();
    // this.fetchTemplateData(); // Fetch the template data only if selectedTemplateId is not 0
  },
};
</script>