<template>
    <div class="upload-container">
        <a-spin :spinning="loading">
            <label for="file-template-upload" class="custom-file-template-upload">
                <i class="bi bi-upload"></i>
                <div>Upload</div>
                <span>The file type can only be .jpg, .jpeg, and .png.</span>

            </label>
        </a-spin>
        <input type="file" id="file-template-upload" multiple @change="onFileChange" class="file-input" />
        <button @click="uploadImages" class="upload-btn mt-3">
            Upload
            <span class="material-symbols-outlined">upload</span>
        </button>
        <div v-if="this.images.length" class="file-names-row">
            <div v-for="(img, index) in this.images" :key="index" class="file-name-item">
                <a-tag color="green">{{ img.name }}</a-tag>
            </div>
        </div>


    </div>


    <div v-if="uploadedImages.length" class="upload-container-image">
    <div class="images-preview">
        <div class="file-names-row">
            <div v-for="(image, index) in uploadedImages" :key="index" class="image-item">
                <img :src="image" alt="Uploaded Image" class="image" />
            </div>
        </div>
    </div>
</div>

<div class="skip" @click="goToBranch">or Skip, do it later 
    <span class="material-symbols-outlined">east</span>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from "vue3-toastify";
import "../../assets/css/views/multipleImageUpload.css"

export default {
  data() {
    return {
      images: [],
      uploadedImages: [],
      loading: false,
    };
  },
  methods: {
    onFileChange(event) {
      this.images = event.target.files;
      console.log(this.images[0])
    },
    async uploadImages() {
      if (!this.images.length) {
        toast.error("Please select images to upload.");
        return;
      }

      this.loading = true;
      let formData = new FormData();
      for (let i = 0; i < this.images.length; i++) {
        formData.append('images[]', this.images[i]);
      }

      try {
        const response = await axios.post('https://panel.dinelim.ai/api/upload-multiple-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          toast.success("Images uploaded successfully.");
        }

        this.uploadedImages = response.data.paths.map(path => {
          return `https://panel.dinelim.ai/uploads/${path}`;
        });

      } catch (error) {
        console.error("Error occurred while uploading images:", error);
        toast.error("Error uploading images. Please try again.");
      } finally {
        this.loading = false;
      }
    },
    goToBranch() {
      this.$router.push('/branch'); // Navigate to /branch
    }
  },
};

</script>

<style>
.upload-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.custom-file-template-upload {
    padding: 20px;
    background-color: #f5f5f5;
    border: 2px dashed #cfcfcf;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-bottom: 20px;
}

.custom-file-template-upload:hover {
    background-color: #e8f0fe;
}

.file-input {
    display: none;
}

.upload-btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.upload-btn:hover {
    background-color: #218838;
}

.upload-container-image {
    margin-top: 30px;
    text-align: center;
}

.images-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 10px;
}



.file-names-row {
    display: flex;
    flex-wrap: wrap;

}


.image-item {
    flex-grow: 1;
  width: 33%;
  height: 100px;
}

.image {
    max-width: 110px; /* Görüntü genişliği */
    max-height: 110px; /* Görüntü yüksekliği */
    object-fit: cover; /* Görüntüyü kutuya sığdır */
    border-radius: 5px;
}
a-tag {
    display: inline-block;
    margin-top: 10px;
}

/* Responsive Design */
@media (max-width: 576px) {
    .upload-container {
        padding: 10px;
    }

    .custom-file-template-upload {
        padding: 15px;
    }

    .upload-btn {
        width: 100%;
        padding: 12px;
    }

    .image-grid {
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    }
}
</style>