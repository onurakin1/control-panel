<template>
  <div id="app">
    <div class="template row">
      <div class="template-setting-area col-md-9">

        <div class="template-setting-form">
          <div class="mb-5">

            <div class="file-template-upload">
              <span><b>Upload Template</b></span>
              <label for="file-template-upload" class="custom-file-template-upload">
                <i class="bi bi-upload"></i>
                <div>Upload</div>
                <span>The file type can only be .jpg, .jpeg, and .png.</span>
              </label>

              <input type="file" id="file-template-upload" @change="onFileChangeTemplate" />

            </div>
          </div>
          <div class="template-setting-main">
            <div v-if="logoUrlInternal != 'logo_1000.png'">
              <div class="photo-area">
                <div class="polaroid">
                  <div class="img-container" @click="toggler = !toggler">
                    <img :src="'https://panel.dinelim.ai/uploads/' + logoUrlInternal" class="image" style="width:100%">

                  </div>
                  <div class="container">
                    <i class="bi bi-trash3" @click="resetFile"></i>
                  </div>
                </div>

              </div>


            </div>
            <div v-else>
              <div class="file-upload">
                <span><b>Upload Logo</b></span>
                <label for="file-upload" class="custom-file-upload">
                  <i class="bi bi-upload"></i>
                  <div>Upload</div>
                  <span>The file type can only be .jpg, .jpeg, and .png.</span>
                </label>
                <input type="file" id="file-upload" @change="onFileChangeLogo" accept="image/*,video/*" />
              </div>
            </div>
            <div class="color-select">
              <span><b>Select Template Color</b></span>
              <div class="color-select-item">
                <span>Background Color</span>
                <ColorPicker :selectedColor="secondaryBgColor" @color-changed="handleSecondaryBgColorChange" />
              </div>
              <div class="color-select-item">
                <span>Accent Color</span>
                <ColorPicker :selectedColor="selectedBgColor" @color-changed="handleBgColorChange" />
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
              <button @click="setLayout('two')" :class="{ active: layoutInternal === 'two' }">
                <i class="bi bi-grid-1x2"></i> Two Column
              </button>
              <button @click="setLayout('three')" :class="{ active: layoutInternal === 'three' }">
                <i class="bi bi-grid-3x3-gap"></i> Three Column
              </button>
            </span>
          </div>
          <div class="layout-items">
            <span><b>Select Font Size:</b></span>
            <select v-model="fontSize" class="form-select" style="width: 100px" aria-label="Default select example">
              <option value="14px" selected>14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
            </select>
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
            <select v-model="selectedLanguagesInternal" class="form-select" multiple style="width: 200px"
              aria-label="Select languages">
              <option value="ar">Arabic</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="de">German</option>
              <option value="it">Italian</option>
              <option value="tr">Turkish</option>
            </select>
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
            <div class="template-border">
              <component :is="template" :mainBgColor="selectedBgColorInternal"
                :secondaryBgColor="secondaryBgColorInternal" :selectedLanguage="selectedLanguagesInternal"
                :textColor="textColorInternal" :logoSize="'120px'" :iconSize="iconSizeInternal" :layout="layoutInternal"
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
      selectedLanguagesInternal: this.selectedLanguages, // Initialized in created hook
      fontSize: "14px", // Default font size
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
    async onFileChangeTemplate(e) {
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
        this.mediaUrlInternal = response.data.filePath;
        this.$emit("update:mediaUrl", response.data.filePath);
      } catch (error) {
        console.error("File upload error:", error);
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
    resetFile(){
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