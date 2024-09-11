<template>
    <div class="upload-container">
      <h2>Multiple Images Upload</h2>
      <input type="file" multiple @change="onFileChange" class="file-input" />
      <button @click="uploadImages" class="upload-btn">Upload <span class="material-symbols-outlined">
upload
</span></button>
  
      <div v-if="uploadedImages.length" class="images-preview">
        <h3>Uploaded Images</h3>
        <div class="image-grid">
          <div v-for="(image, index) in uploadedImages" :key="index" class="image-item">
            <img :src="image" alt="Uploaded Image" class="image" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        images: [],
        uploadedImages: [],
      };
    },
    methods: {
      onFileChange(event) {
        this.images = event.target.files;
      },
      async uploadImages() {
        let formData = new FormData();
        for (let i = 0; i < this.images.length; i++) {
          formData.append('images[]', this.images[i]);
        }
  
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/upload-multiple-image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          // Yüklenen resimlerin yollarını al
          this.uploadedImages = response.data.paths.map(path => {
            return `http://127.0.0.1:8000/uploads/${path}`;
          });
  
        } catch (error) {
          console.error("Resim yüklenirken hata oluştu:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
  }
  
  h2 {
    font-family: 'Arial', sans-serif;
    color: #333;
    margin-bottom: 20px;
  }
  
  .file-input {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 2px solid #ddd;
    cursor: pointer;
  }
  
  .upload-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 120px;
    width: 100%;
  }
  
  .upload-btn:hover {
    background-color: #45a049;
  }
  
  .images-preview {
    margin-top: 20px;
    width: 100%;
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    justify-items: center;
  }
  
  .image-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border: 2px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
  }
  
  .image {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    transition: transform 0.3s;
  }
  
  .image:hover {
    transform: scale(1.1);
  }
  </style>
  