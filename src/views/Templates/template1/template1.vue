<template>
  <div v-if="mode == 'home'" style="height: 100%;width: 100%;background-size: cover;">
    <div class="homepage">
      <!-- Image Background -->
      {{ selectedBranchId }}
      <div v-if="isImage(mediaUrl)"
        :style="{ backgroundImage: `url(${require(`@/assets/img/templates/templates1/${mediaUrl}`)})` }" class="banner">
        <div class="top-actions">
          <div class="share">
            <div class="share-button" @click="toggleShareMenu" :style="{ backgroundColor: mainBgColor }">
              <div><i class="bi bi-share"></i></div>
              <ul v-if="isShareMenuVisible" class="social-icons">
                <li class="facebook facebook-bg">
                  <a href="#"><i class="bi bi-facebook"></i></a>
                </li>
                <li class="twitter twitter-bg">
                  <a href="#"><i class="bi bi-twitter-x"></i></a>
                </li>
                <li class="pinterest pinterest-bg">
                  <a href="#"><i class="bi bi-pinterest"></i></a>
                </li>
                <li class="linkedin linkedin-bg">
                  <a href="#"><i class="bi bi-linkedin"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="language">
            <ul class="language-list">
              <li v-for="language in selectedLanguages" :key="language" :style="{
                borderColor: mainBgColor,
                backgroundColor: hovered === language ? mainBgColor : '',
              }" @mouseenter="hovered = language" @mouseleave="hovered = null">
                {{ formatLanguage(language) }}
              </li>
            </ul>
          </div>
        </div>
        <div class="logo">
          <img :src="computedLogoUrl" alt="Logo" :style="{ backgroundColor: mainBgColor, maxWidth: logoSize }" />
        </div>
      </div>

      <!-- Video Background -->
      <div v-else-if="isVideo(mediaUrl)" class="banner">
        <video :src="videoSource" autoplay loop muted class="video-background"></video>
        <div class="top-actions">
          <div class="share">
            <div class="share-button" @click="toggleShareMenu" :style="{ backgroundColor: mainBgColor }">
              <div><i class="bi bi-share"></i></div>
              <ul v-if="isShareMenuVisible" class="social-icons">
                <li class="facebook facebook-bg">
                  <a href="#"><i class="bi bi-facebook"></i></a>
                </li>
                <li class="twitter twitter-bg">
                  <a href="#"><i class="bi bi-twitter-x"></i></a>
                </li>
                <li class="pinterest pinterest-bg">
                  <a href="#"><i class="bi bi-pinterest"></i></a>
                </li>
                <li class="linkedin linkedin-bg">
                  <a href="#"><i class="bi bi-linkedin"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="language">
            <ul class="language-list">
              <li v-for="language in selectedLanguages" :key="language" :style="{
                borderColor: mainBgColor,
                backgroundColor: hovered === language ? mainBgColor : '',
              }" @mouseenter="hovered = language" @mouseleave="hovered = null">
                {{ formatLanguage(language) }}
              </li>
            </ul>
          </div>
        </div>
        <div class="logo">
          <img :src="computedLogoUrl" alt="Logo" :style="{ backgroundColor: mainBgColor, maxWidth: logoSize }" />
        </div>
      </div>

      <div class="menu-body" :style="{ backgroundColor: secondaryBgColor }">

        <div class="menu-container">
          <div class="menu-icon-item" v-for="item in menuList" :key="item.id" @click="view('menu')">
            <div class="icon-circle" :style="{ backgroundColor: mainBgColor, height: iconSize, width: iconSize }">
              <img :src="item.image" alt="Food Icon" class="icon-image" />
            </div>
            <div class="icon-label" :style="{ color: mainBgColor }">{{ item.name }}</div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div v-else-if="mode == 'menu'" class="menupage">

    <div class="d-flex" style="gap:20px;" :style="{ backgroundColor: secondaryBgColor }">
      <div class="d-flex flex-column flex-shrink-0 p-3 text-white template-sidebar"
        :style="{ backgroundColor: mainBgColor }">
        <ul class="nav nav-pills flex-column mb-auto">
          <li v-for="item in sideMenuItems" :key="item.category_id" class="nav-item">
            <div @click="handleClick(item)" class="text-white menu-item template-menu-item">
              <img :src="item.image" :alt="item.category_name" style="width: 70px; height: 70px;" />
              <span class="template-nav-text">{{ item.category_name }}</span>
            </div>
            <ul v-if="item.showChildren" class="nav nav-pills flex-column mb-auto">
              <li v-for="child in item.children" :key="child.category_id" class="nav-item">
                <div class="text-white menu-item template-menu-item" @click="handleClick(child)">
                  <img :src="child.image" :alt="child.category_name" style="width: 60px; height: 60px;" />
                  <span class="template-nav-text">{{ child.category_name }}</span>
                </div>

              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="tab-content product-content" id="pills-tabContent">

        <div class="menu-nav">
          <ul class="nav nav-pills" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation" v-for="item in menuList" :key="item.id">
              <button class="nav-link" :class="{ active: activeMenuTab === item.id }" :id="`pills-${item.name}-tab`"
                data-bs-toggle="pill" :data-bs-target="`#pills-${item.name}`" type="button" role="tab"
                :aria-controls="`pills-${item.name}`" :aria-selected="activeMenuTab === item.id"
                @click="setMenuActiveTab(item.id)" :style="activeMenuTab === item.id ? activeMenuTabStyle : null">
                {{ item.name }}
              </button>
            </li>
          </ul>
          <div class="back-btn" :style="{ backgroundColor: mainBgColor }" @click="view('home')">
            <i class="bi bi-chevron-left"></i>
          </div>
        </div>
        <div class="language_nav">
          <ul class="nav nav-pills" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation" v-for="language in selectedLanguages" :key="language">
              <button class="nav-link" :class="{ active: activeTab === language }" :id="`pills-${language}-tab`"
                data-bs-toggle="pill" :data-bs-target="`#pills-${language}`" type="button" role="tab"
                :aria-controls="`pills-${language}`" aria-selected="true" @click="setActiveTab(language)"
                :style="activeTab === language ? activeTabStyle : color = mainBgColor">
                {{ formatLanguage(language) }}
              </button>
            </li>

          </ul>
        </div>
        <div class="product-items">
          <div class="tab-content" id="pills-tabContent">
            <div v-for="item in menuList" :key="item.id" class="tab-pane fade"
              :class="{ 'show active': activeMenuTab === item.id }" :id="`pills-${item.name}-tab`" role="tabpanel"
              :aria-labelledby="`pills-${item.name}-tab`">
              <div class="row">
                <div v-for="item in productItems" :key="item.product_id" :class="colClass"
                  @click="getProductDesc(item.product_id)">
                  <div class="menu-card" :style="{ backgroundColor: mainBgColor }">
                    <img :src="getImageUrl(item.image)" :alt="item.name" class="card-img" />
                    <div class="container">
                      <h4><b :style="{ color: textColor, fontSize: fontSize }">{{ item.name
                          }}</b></h4>
                      <p :style="{ color: textColor }">{{ item.price }}$</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


  </div>

  <div v-else>
    <div class="desc-area">

      <div class="back-btn" :style="{ backgroundColor: mainBgColor }" @click="view('menu')"
        style="top:22px;right: -5px;">
        <i class="bi bi-chevron-left"></i>
      </div>
      <div v-for="descItem in productDesc" :key="descItem.id">
        <div class="desc-img">
          <img :src="descItem.image" />
        </div>
        <div class="desc-name">
          <h4>{{ descItem.name }}</h4>

          <h5>{{ descItem.price }}$</h5>
        </div>
        <div class="mt-4">{{ descItem.desc }}</div>
      </div>



    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useCategoryStore } from '@/stores/categoryStore'; // Adjust the path if necessary
import { useBranchStore } from '@/stores/branchStore';
import "../../../assets/css/views/templates/template1.css";

export default {
  name: "Template1Page",
  props: {
    layout: {
      type: String,
      default: 'three', // Default layout is three columns
      validator: value => ['two', 'three'].includes(value),
    },
    logoSize: {
      type: String,
      default: '150px',
    },
    iconSize: {
      type: String,
      default: '100px',
    },
    mainBgColor: {
      type: String,
      default: '#505095',
    },
    textColor: {
      type: String,
      default: '#fff',
    },
    secondaryBgColor: {
      type: String,
      default: '#fff',
    },
    selectedLanguages: Array,
    mediaUrl: String,
    logoUrl: String,
    fontSize: String
  },
  data() {
    return {
      menuStore: useCategoryStore(),
      branchStore: useBranchStore(),
      isShareMenuVisible: false,
      languages: ["AR", "EN"],
      hovered: null,
      mode: 'home',
      activeTab: 'EN',
      activeMenuTab: '',
      activeProduct: '', // Added activeProduct to track selected product category
      sideMenuItems: [],
      image: require('@/assets/img/templates/menu_images/lotus.jpg'),

      productItems: [],
      productDesc: []
    };
  },
  computed: {
    menuList() {
      return this.menuStore.getCategories;
    },
    selectedBranchId() {
      return this.branchStore.selectedBranchId;
    },
    computedLogoUrl() {
      return require(`@/assets/img/templates/templates1/${this.logoUrl}`);
    },
    activeMenuTabStyle() {
      return {
        background: this.mainBgColor,
        color: '#fff'
      };
    },
    activeTabStyle() {
      return {
        background: 'none',
        color: this.mainBgColor,
        borderRadius: '0%',
        borderBottom: `2px solid ${this.mainBgColor}`,
      };
    },
    colClass() {
      return this.layout === 'two' ? 'col-6' : 'col-4';
    },
    videoSource() {
      try {
        return require(`@/assets/img/templates/templates1/${this.mediaUrl}`);
      } catch (error) {
        console.error('Video not found:', error);
        return null;
      }
    }
  },
  methods: {
    getProductDesc(id) {
      this.mode = 'desc'
      console.log(this.selectedBranchId)
      axios.get(`https://panel.dinelim.ai/api/product-description/${id}`)
        .then(response => {

          this.productDesc = response.data.filter(product => product.branch_group_id === this.selectedBranchId);
          console.log(this.productDesc)
        })
        .catch(error => {
          console.error('Error fetching product data:', error);
        });
      console.log(id)
    },
    getImageUrl(image) {
      // Return the image if it's not null, otherwise return the default image
      return image || this.defaultImage;
    },
    formatLanguage(language) {
      return language.toUpperCase();
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    setMenuActiveTab(tab) {
      this.activeMenuTab = tab;
      axios.get(`https://panel.dinelim.ai/api/product-category/${tab}`)
        .then(response => {
          const categories = response.data.map(category => ({
            ...category,
            showChildren: false,
            children: category.child || [] // Alt kategoriler
          }));

          const sortedCategories = categories.sort((a, b) => a.sort_order - b.sort_order);
          this.sideMenuItems = sortedCategories;
          // Set the active product after categories are loaded
          if (this.sideMenuItems.length > 0) {
            this.activeProduct = this.sideMenuItems[0].category_id;
            this.setProduct(this.activeProduct); // Call setProduct with the first category
          }
        })
        .catch(error => {
          console.error('Error fetching category data:', error);
        });
    },
    handleClick(item) {
      if (item.children && item.children.length > 0) {
        // Toggle visibility of children if they exist
        item.showChildren = !item.showChildren;
      } else {
        // Call setProduct method if no children
        this.setProduct(item.category_id);
      }
    },
    setProduct(tab) {
      this.activeProduct = tab;
      axios.get(`https://panel.dinelim.ai/api/product/${tab}`)
        .then(response => {
          this.productItems = response.data;
          console.log(this.productItems)
        })
        .catch(error => {
          console.error('Error fetching product data:', error);
        });
    },
    toggleShareMenu() {
      this.isShareMenuVisible = !this.isShareMenuVisible;
    },
    view(mode) {
      console.log('Selected Branch ID:', this.selectedBranchId);
      this.mode = mode;
    },
    isImage(url) {
      return /\.(jpeg|jpg|gif|png)$/i.test(url);
    },
    isVideo(url) {
      return /\.(mp4|webm|ogg)$/i.test(url);
    },
  },
  mounted() {
    // Set initial activeMenuTab to the ID of the first item in menuList
    if (this.menuList.length > 0) {
      this.activeMenuTab = this.menuList[0].id;
      this.setMenuActiveTab(this.activeMenuTab); // Fetch data for the initial tab
    }
  },
  watch: {
    menuList(newMenuList) {
      if (newMenuList.length > 0 && !this.activeMenuTab) {
        this.activeMenuTab = newMenuList[0].id;
        this.setMenuActiveTab(this.activeMenuTab); // Fetch data for the new tab
      }
    }
  }
};
</script>


<style>
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
</style>