<template>
  <div id="app">
    <div class="template row">
      <div class="template-setting-area col-md-9">

        <div class="template-setting-form">
   
          <div class="template-setting-main">
            <div class="mb-2">
            <a-spin :spinning="loading">
              <div class="file-template-upload" v-if="mediaUrlInternal === 'home_bg.jpg'">
                <span><b>Upload Banner</b></span>
                <label for="file-template-upload" class="custom-file-template-upload">
                  <i class="bi bi-upload"></i>
                  <div>Upload</div>
                  <span>The file type can only be .jpg, .jpeg, and .png.</span>
                </label>
                <input type="file" id="file-template-upload" @change="onFileChangeTemplate" />
              </div>
            </a-spin>
            <div v-if="mediaUrlInternal != 'home_bg.jpg'">
              <div class="photo-area" style="max-width: 200px;">
                <div class="polaroid">
                  <div class="img-container" @click="toggler = !toggler">
                    <template v-if="isImage(mediaUrlInternal)">
                      <img :src="'https://panel.dinelim.ai/uploads/' + mediaUrlInternal" class="image"
                        style="width:100%">
                    </template>
                    <template v-else-if="isVideo(mediaUrlInternal)">
                      <video controls style="width:100%">
                        <source :src="'https://panel.dinelim.ai/uploads/' + mediaUrlInternal" type="video/mp4">
                        Your browser does not support the video tag.
                      </video>
                    </template>


                  </div>
                  <div class="container">
                    <i class="bi bi-trash3" @click="resetBannerFile"></i>
                  </div>
                </div>
              </div>
            </div>

          </div>
            <div class="color-select">
              <span><b>Select Template Color</b></span>
              <div class="color-select-item mb-3">
                <span>Background Color</span>
                <ColorPicker :selectedColor="secondaryBgColor" @color-changed="handleSecondaryBgColorChange" />
              </div>
              <div class="color-select-item mb-3">
                <span>Accent Color</span>
                <ColorPicker :selectedColor="selectedBgColor" @color-changed="handleBgColorChange" />
              </div>
              <div class="color-select-item mb-3">
                <span>Text Color</span>
                <ColorPicker @color-changed="handleTextColorChange" />
              </div>
            </div>

          </div>
          <div class="layout-items">
            <span><b>Select Menu Layout:</b></span>
            <div class="btn-group me-2" role="group" aria-label="First group">
              <button type="button" class="btn btn-outline-secondary" @click="setLayout('two')"
                :class="{ active: layoutInternal === 'two' }"><img src="@/assets/img/icons/two-columns.png"
                  width="24px" /></button>
              <button type="button" class="btn btn-outline-secondary" @click="setLayout('three')"
                :class="{ active: layoutInternal === 'three' }"><img src="@/assets/img/icons/three-columns.png"
                  width="24px" /></button>

            </div>

          </div>
   
          <div class="layout-items">
            <span><b>Select Icon Size:</b></span>
            <select v-model="iconSizeInternal" class="form-select" style="width: 100px"
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

            <a-select id="languages" mode="multiple" :options="languages" v-model:value="selectedLanguagesInternal"
              placeholder="Select languages" style="width: 200px" />

          </div>
          <div class="d-flex justify-content-end">
            <button class="save-button" @click="saveSettings">
              {{ selectedTemplateId == 0 ? "Save" : "Update" }}
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight">
          Preview
        </button>

        <div class="offcanvas offcanvas-end preview-offcanvas" tabindex="-1" id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel">
          <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel">Template Preview</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div class="template-border" >
              <component :is="template" :mainBgColor="selectedBgColorInternal"
                :secondaryBgColor="secondaryBgColorInternal" :selectedLanguage="selectedLanguagesInternal"
                :textColor="textColorInternal" :logoSize="'80px'" :iconSize="'80px'" :layout="layoutInternal"
                :logoUrl="logoUrlInternal" :mediaUrl="mediaUrlInternal" :fontSize="fontSize" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Spin } from 'ant-design-vue';
import Template1 from "./Templates/template1/Home.vue";
import ColorPicker from "../components/ColorPickerComp.vue";
import "../assets/css/views/templates/templateSettings.css";

export default {
  name: "TemplateSettingsComp",
  components: {
    ColorPicker,
    Template1,
    Spin,
  },
  props: {
    template: String,
    selectedTemplateId: Number,
    selectedBgColor: {
      type: String,
      required: true,
    },
    secondaryBgColor: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      required: true,
    },
    layout: {
      type: String,
      required: true,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
    },
    IconSize: {
      type: String,
      required: true,
    },
    selectedLanguages: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // Internal states mirroring props
      file: null,
      filePath: "",
      selectedBgColorInternal: this.selectedBgColor,
      secondaryBgColorInternal: this.secondaryBgColor,
      textColorInternal: this.textColor,
      layoutInternal: this.layout,
      mediaUrlInternal: this.mediaUrl,
      logoUrlInternal: this.logoUrl,
      iconSizeInternal: this.IconSize,
      selectedLanguagesInternal: this.selectedLanguages,
      languages: [
        { value: 'ar', label: 'Arabic' },
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'French' },
        { value: 'es', label: 'Spanish' },
        { value: 'de', label: 'German' },
        { value: 'it', label: 'Italian' },
        { value: 'tr', label: 'Turkish' }
      ],
      languageMap: {
        'ar': 'Arabic',
        'en': 'English',
        'fr': 'French',
        'es': 'Spanish',
        'de': 'German',
        'it': 'Italian',
        'tr': 'Turkish'
      },
      fontSize: "14px",
      loading: false,
    };
  },
  watch: {
    selectedBgColor(newVal) {
      this.selectedBgColorInternal = newVal;
    },
    secondaryBgColor(newVal) {
      this.secondaryBgColorInternal = newVal;
    },
    textColor(newVal) {
      this.textColorInternal = newVal;
    },
    layout(newVal) {
      this.layoutInternal = newVal;
    },
    mediaUrl(newVal) {
      this.mediaUrlInternal = newVal;
    },
    logoUrl(newVal) {
      this.logoUrlInternal = newVal;
    },
    IconSize(newVal) {
      this.iconSizeInternal = newVal;
    },
    selectedLanguages(newVal) {
      this.selectedLanguagesInternal = newVal;
    },
  },

  methods: {
    isImage(url) {
      return url.match(/\.(jpg|jpeg|png)$/i);
    },
    isVideo(url) {
      return url.match(/\.(mp4)$/i);
    },
    async onFileChangeTemplate(e) {
      this.file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", this.file);

      this.loading = true; // Show spinner

      try {
        const response = await axios.post(
          "https://panel.dinelim.ai/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.mediaUrlInternal = response.data.filePath;
        this.$emit("update:mediaUrl", response.data.filePath);
      } catch (error) {
        console.error("File upload error:", error);
      } finally {
        this.loading = false; // Hide spinner
      }
    },
    async onFileChangeLogo(e) {
      this.file = e.target.files[0];
      console.log(this.file);
      const formData = new FormData();
      formData.append("file", this.file);

      try {
        const response = await axios.post(
          "https://panel.dinelim.ai/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.logoUrlInternal = response.data.filePath;
        this.$emit("update:logoUrl", response.data.filePath);
      } catch (error) {
        console.error("File upload error:", error);
      }
    },

    handleBgColorChange(newColor) {
      this.selectedBgColorInternal = newColor;
      this.$emit("update:selectedBgColor", newColor); // Emit to parent
    },
    handleSecondaryBgColorChange(newColor) {
      this.secondaryBgColorInternal = newColor;
      this.$emit("update:secondaryBgColor", newColor); // Emit to parent
    },
    handleTextColorChange(newColor) {
      this.textColorInternal = newColor;
      this.$emit("update:textColor", newColor); // Emit to parent
    },
    setLayout(newLayout) {
      this.layoutInternal = newLayout;
      this.$emit("update:layout", newLayout); // Emit to parent
    },
    resetBannerFile() {
      this.mediaUrlInternal = 'home_bg.jpg';
    },
    resetFile() {
      this.logoUrlInternal = 'logo_1000.png';
    },
    handleLogoFileUpload(event) {
      const file = event.target.files[0];
      console.log(file);
      if (file) {
        this.logoUrlInternal = file.name; // Create a URL for the uploaded file
        this.$emit("update:logoUrl", file.name); // Emit to parent
      }
    },
    saveSettings() {
      // Emit an event with the form data
      this.$emit("save-settings", {
        user_id: null,
        languages: this.selectedLanguagesInternal,
        color: [
          { name: "selectedBgColor", value: this.selectedBgColorInternal },
          { name: "secondaryBgColor", value: this.secondaryBgColorInternal },
          { name: "textColor", value: this.textColorInternal },
        ],
        layout: this.layoutInternal,
        banner: this.mediaUrlInternal,
        logo: this.logoUrlInternal,
        size: this.iconSizeInternal,
        name: this.template,
      });
    },
  },
};
</script>

<style scoped>
.form-select[multiple] {
  height: auto;
}
</style>