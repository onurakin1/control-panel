<template>
    <div v-if="mode == 'home'" style="height: 100%;width: 100%;background-size: cover;">

        <div class="homepage">
            <!-- Image Background -->
            <div v-if="isImage(mediaUrl)" :style="{ backgroundImage: `url(${computedMediaUrl})` }" class="banner">
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
                            <li v-for="language in transformedLanguages" :key="language.id" :style="{
                                borderColor: mainBgColor,
                                backgroundColor: hovered === language.name ? mainBgColor : '',
                            }" @mouseenter="hovered = language.name" @mouseleave="hovered = null"
                                @click="sLanguage(language.id)">
                                {{ formatLanguage(language.name) }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="logo">
                    <img :src="computedLogoUrl" alt="Logo"
                        :style="{ backgroundColor: mainBgColor, maxWidth: logoSize }" />
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
                            <li v-for="language in transformedLanguages" :key="language.id" :style="{
                                borderColor: mainBgColor,
                                backgroundColor: hovered === language.name ? mainBgColor : '',
                            }" @mouseenter="hovered = language.name" @mouseleave="hovered = null">
                                {{ formatLanguage(language.name) }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="logo">
                    <img :src="computedLogoUrl" alt="Logo"
                        :style="{ backgroundColor: mainBgColor, maxWidth: logoSize }" />
                </div>
            </div>

            <div class="menu-body" :style="{ backgroundColor: secondaryBgColor }">

                <div class="menu-container">
                    <div class="menu-icon-item" v-for="item in menuList" :key="item.id"
                        @click="view('menu'); setMenuActiveTab(item.parent_id);">
                        <div class="icon-circle"
                            :style="{ backgroundColor: mainBgColor, height: iconSize, width: iconSize }">
                            <img :src="item.image" alt="Food Icon" class="icon-image" />
                        </div>
                        <div class="icon-label" :style="{ color: mainBgColor }">{{ item.name }}</div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="menupage" v-else>

        <div class="d-flex" style="gap:20px;" :style="{ backgroundColor: secondaryBgColor }">
            <div class="d-flex flex-column flex-shrink-0 text-white sidebar-size" id="sidebar"
                style="width: 100px;overflow: scroll;" :style="{ backgroundColor: mainBgColor }">
                <ul class="nav nav-pills flex-column mb-auto wizard-nav">
                    <li v-for="(item, index) in this.sortedSideMenuItems" :key="index" class="nav-item">
                        <div class="nav-link text-white menu-item" @click="setSideMenuActiveProducts(item.category_id)">
                            <img :src="item.image" :alt="item.name" class="card-img"
                                style="height: 50px;width: 50px;" />
                            <span class="nav-text">{{ item.name }}</span>

                        </div>
                    </li>
                </ul>
            </div>





            <div class="tab-content product-content" id="pills-tabContent">

                <div class="menu-nav">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation" v-for="item in menuList" :key="item.parent_id">
                            <button class="nav-link" :class="{ active: activeMenuTab === item.parent_id }"
                                :id="`pills-${item.name}-tab`" data-bs-toggle="pill"
                                :data-bs-target="`#pills-${item.name}`" type="button" role="tab"
                                :aria-controls="`pills-${item.name}`" :aria-selected="activeMenuTab === item.parent_id"
                                @click="setMenuActiveTab(item.parent_id)" @mouseover="hoveredMenuTab = item.parent_id"
                                @mouseleave="hoveredMenuTab = null" :style="getButtonStyle(item.parent_id)">
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
                        <li class="nav-item" role="presentation" v-for="language in transformedLanguages"
                            :key="language.id">
                            <button class="nav-link" :class="{ active: activeTab === language.name }"
                                :id="`pills-${language.name}-tab`" data-bs-toggle="pill"
                                :data-bs-target="`#pills-${language.name}`" type="button" role="tab"
                                :aria-controls="`pills-${language.name}`" aria-selected="true"
                                @click="setActiveTab(language)"
                                :style="activeTab == language.name ? activeTabStyle : color = mainBgColor">
                                <!-- {{ formatLanguage(language.name) }} -->
                                {{ language.name }}
                            </button>
                        </li>

                    </ul>
                </div>
                <div class="product-wizard-items">
                    <div class="tab-content" id="pills-tabContent">
                        <div v-for="item in menuList" :key="item.parent_id" class="tab-pane fade"
                            :class="{ 'show active': activeMenuTab === item.parent_id }" :id="`pills-${item.name}-tab`"
                            role="tabpanel" :aria-labelledby="`pills-${item.name}-tab`">
                            <div class="row">
                                <div v-for="(item, index) in this.sortedProductItems" :key="index" :class="colClass">
                                    <div class="menu-card" :style="{ backgroundColor: mainBgColor }">
                                        <img :src="item.image" :alt="item.name" class="card-img" />
                                        <div class="container">
                                            <h4><b :style="{ color: textColor, fontSize: fontSize }">{{ item.name
                                                    }}</b></h4>
                                            <p :style="{ color: textColor }">{{ item.price }}</p>
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

</template>

<script>
import "../../../assets/css/views/templates/template1.css";

export default {
    name: "HomePage",
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
            default: '#fff'
        },
        secondaryBgColor: {
            type: String,
            default: '#fff'
        },
        mediaUrl: {
            type: String,
            default: ""
        },
        logoUrl: {
            type: String,
            default: require(`@/assets/img/templates/templates1/logo_1000.png`)
        },
        selectedLanguage: {
            type: Array,
            default: () => ["AR", "EN"]
        },
        fontSize: String,
        disabled: Boolean
    },
    data() {
        return {
            isShareMenuVisible: false,
            hovered: null,
            mode: 'home',
            activeTab: 'EN',
            hoveredMenuTab: null,
            activeMenuTab: '',
          
            selectedLanguageId: 0,
            activeProduct: '',
            menuCategories: [
                {
                    "id": 1,
                    "name": "Food",
                    "image": "/img/cat_9_new.4e841a97.png",
                    "created_date": "16-07-2024",
                    "branch_id": "1000",
                    "language_id": "0",
                    "parent_id": "1"
                },
                {
                    "id": 2,
                    "name": "Drink",
                    "image": "/img/cat_232.e3bceff3.png",
                    "created_date": "16-07-2024",
                    "branch_id": "1000",
                    "language_id": "0",
                    "parent_id": "2"
                },
                {
                    "id": 4,
                    "name": "Yemek",
                    "image": "/img/cat_9_new.4e841a97.png",
                    "created_date": "16-07-2024",
                    "branch_id": "1000",
                    "language_id": "1",
                    "parent_id": "1"
                },
                {
                    "id": 5,
                    "name": "İçecek",
                    "image": "/img/cat_232.e3bceff3.png",
                    "created_date": "16-07-2024",
                    "branch_id": "1000",
                    "language_id": "1",
                    "parent_id": "2"
                }
            ],
            sortedSideMenuItems: [],


            sideMenuItems: [
                {
                    category_id: 1,
                    group_id: 1,
                    language_id: 0,
                    name: 'Breakfast',
                    image: require('@/assets/img/icons/cat_101.png'),

                },
                {
                    category_id: 2,
                    group_id: 1,
                    language_id: 0,
                    name: 'Soups',
                    image: require('@/assets/img/icons/cat_2 (1).png'),

                },
                {
                    category_id: 3,
                    group_id: 1,
                    language_id: 0,
                    name: 'Fresh Salads',
                    image: require('@/assets/img/icons/cat_4.png'),

                },
                {
                    category_id: 1,
                    group_id: 1,
                    language_id: 1,
                    name: 'Kahvaltı',
                    image: require('@/assets/img/icons/cat_101.png'),

                },
                {
                    category_id: 2,
                    group_id: 1,
                    language_id: 1,
                    name: 'Çorbalar',
                    image: require('@/assets/img/icons/cat_2 (1).png'),

                },
                {
                    category_id: 3,
                    group_id: 1,
                    language_id: 1,
                    name: 'Salatalar',
                    image: require('@/assets/img/icons/cat_4.png'),

                },
                {
                    category_id: 4,
                    group_id: 2,
                    language_id: 0,
                    name: 'Hot Drink',
                    image: require('@/assets/img/icons/cat_727.png'),

                },
                {
                    category_id: 4,
                    group_id: 2,
                    language_id: 1,
                    name: 'Sıcak İçecekler',
                    image: require('@/assets/img/icons/cat_727.png'),

                }

            ],
            productItems: [
                {
                    category_id: 2,
                    language_id: 0,
                    name: 'Tomato Soup',
                    price: '12.00$',
                    image: require('@/assets/img/templates/menu_images/TomatoSoup.jpg'),
                },
                {
                    category_id: 2,
                    language_id: 0,
                    name: 'Chicken Soup',
                    price: '16.00$',
                    image: require('@/assets/img/templates/menu_images/chicken-soup.jpg'),
                },
                {
                    category_id: 2,
                    language_id: 0,
                    name: 'Spagetti Soup',
                    price: '18.00$',
                    image: require('@/assets/img/templates/menu_images/spaghetti-squash-soup.jpg'),
                },
                {
                    category_id: 2,
                    language_id: 0,
                    name: 'Mushroom Soup',
                    price: '18.00$',
                    image: require('@/assets/img/templates/menu_images/mushroom-soup.jpg'),
                },

                {
                    category_id: 2,
                    language_id: 1,
                    name: 'Domatos Çorbası',
                    price: '12.00$',
                    image: require('@/assets/img/templates/menu_images/TomatoSoup.jpg'),
                },
                {
                    category_id: 2,
                    language_id: 1,
                    name: 'Tavuk Çorbası',
                    price: '16.00$',
                    image: require('@/assets/img/templates/menu_images/chicken-soup.jpg'),
                },
                {
                    category_id: 2,
                    language_id: 1,
                    name: 'Spagetti Çorbası',
                    price: '18.00$',
                    image: require('@/assets/img/templates/menu_images/spaghetti-squash-soup.jpg'),
                },
                {
                    category_id: 2,
                    language_id: 1,
                    name: 'Mantar Çorbası',
                    price: '18.00$',
                    image: require('@/assets/img/templates/menu_images/mushroom-soup.jpg'),
                },

                {
                    category_id: 3,
                    language_id: 0,
                    name: 'Bean Salad',
                    price: '12.00$',
                    image: require('@/assets/img/templates/menu_images/bean-salad.jpg'),
                },
                {
                    category_id: 3,
                    language_id: 0,
                    name: 'Broccoli Salad',
                    price: '16.00$',
                    image: require('@/assets/img/templates/menu_images/broccoli-salads.jpg'),
                },
                {
                    category_id: 3,
                    language_id: 0,
                    name: 'Chicken Salad',
                    price: '18.00$',
                    image: require('@/assets/img/templates/menu_images/chicken-salad.jpg'),
                },
                {
                    category_id: 3,
                    language_id: 0,
                    name: 'Shepherds Salad',
                    price: '18.00$',
                    image: require('@/assets/img/templates/menu_images/shepherds-salad.jpg'),
                },


                {
                    category_id: 3,
                    language_id: 1,
                    name: 'Fasulye Salatası',
                    price: '12.00$',
                    image: require('@/assets/img/templates/menu_images/bean-salad.jpg'),
                },
                {
                    category_id: 3,
                    language_id: 1,
                    name: 'Brokoli Salata',
                    price: '16.00$',
                    image: require('@/assets/img/templates/menu_images/broccoli-salads.jpg'),
                },
                {
                    category_id: 3,
                    language_id: 1,
                    name: 'Tavuklu Salata',
                    price: '18.00$',
                    image: require('@/assets/img/templates/menu_images/chicken-salad.jpg'),
                },
                {
                    category_id: 3,
                    language_id: 1,
                    name: 'Çoban Salatası',
                    price: '18.00$',
                    image: require('@/assets/img/templates/menu_images/shepherds-salad.jpg'),
                },


                {
                    category_id: 4,
                    language_id: 0,
                    name: 'Affogato',
                    price: '12.00$',
                    image: require('@/assets/img/templates/menu_images/affogato.jpg'),
                },
                {
                    category_id: 4,
                    language_id: 0,
                    name: 'Lotus Affogato',
                    price: '16.00$',
                    image: require('@/assets/img/templates/menu_images/lotus-affogato.jpg'),
                },
                {
                    category_id: 4,
                    language_id: 0,
                    name: 'Oreo Affogato',
                    price: '18.00$',
                    image: require('@/assets/img/templates/menu_images/oreo-affogato.jpg'),
                },

                {
                    category_id: 4,
                    language_id: 1,
                    name: 'Affogato',
                    price: '12.00$',
                    image: require('@/assets/img/templates/menu_images/affogato.jpg'),
                },
                {
                    category_id: 4,
                    language_id: 1,
                    name: 'Lotuslu Affogato',
                    price: '16.00$',
                    image: require('@/assets/img/templates/menu_images/lotus-affogato.jpg'),
                },
                {
                    category_id: 4,
                    language_id: 1,
                    name: 'Oreolu Affogato',
                    price: '18.00$',
                    image: require('@/assets/img/templates/menu_images/oreo-affogato.jpg'),
                },
                {
                    category_id: 1,
                    language_id: 0,
                    name: 'Breakfast Spread',
                    price: '55.00$',
                    image: require('@/assets/img/templates/menu_images/breakfast_spread.jpg'),
                },
                {
                    category_id: 1,
                    language_id: 0,
                    name: 'Omlette',
                    price: '9.00$',
                    image: require('@/assets/img/templates/menu_images/omlette.jpg'),
                },
                {
                    category_id: 1,
                    language_id: 0,
                    name: 'Sogus Plate',
                    price: '14.00$',
                    image: require('@/assets/img/templates/menu_images/sogus_plate.jpg'),
                },
                {
                    category_id: 1,
                    language_id: 0,
                    name: 'Cheese Plate',
                    price: '18.00$',
                    image: require('@/assets/img/templates/menu_images/cheese_plate.jpg'),
                },
                {
                    category_id: 1,
                    language_id: 0,
                    name: 'Menemen',
                    price: '12.00$',
                    image: require('@/assets/img/templates/menu_images/menemen.jpg'),
                },
                {
                    category_id: 1,
                    language_id: 0,
                    name: 'Fried Egg',
                    price: '9.00$',
                    image: require('@/assets/img/templates/menu_images/fried_egg.jpg'),
                },

                {
                    category_id: 1,
                    language_id: 1,
                    name: 'Kahvaltı Tabağı',
                    price: '55.00$',
                    image: require('@/assets/img/templates/menu_images/breakfast_spread.jpg'),
                },
                {
                    category_id: 1,
                    language_id: 1,
                    name: 'Omlette',
                    price: '9.00$',
                    image: require('@/assets/img/templates/menu_images/omlette.jpg'),
                },
                {
                    category_id: 1,
                    language_id: 1,
                    name: 'Söğüş Tabağı',
                    price: '14.00$',
                    image: require('@/assets/img/templates/menu_images/sogus_plate.jpg'),
                },
                {
                    category_id: 1,
                    language_id: 1,
                    name: 'Peynir Tabağı',
                    price: '18.00$',
                    image: require('@/assets/img/templates/menu_images/cheese_plate.jpg'),
                },
                {
                    category_id: 1,
                    language_id: 1,
                    name: 'Menemen',
                    price: '12.00$',
                    image: require('@/assets/img/templates/menu_images/menemen.jpg'),
                },
                {
                    category_id: 1,
                    language_id: 1,
                    name: 'Kaynamış Yumurta',
                    price: '9.00$',
                    image: require('@/assets/img/templates/menu_images/fried_egg.jpg'),
                },
            ],
            sortedProductItems: []
        };
    },
    computed: {
        menuList() {
            console.log(this.selectedLanguageId)
            return this.menuCategories.filter((menuItem) => menuItem.language_id == this.selectedLanguageId);
        },
        sideMenuList() {
            return this.sideMenuItems.filter((menuItem) => menuItem.language_id == this.selectedLanguageId);
        },
        computedMediaUrl() {
            // Check if mediaUrl is valid, otherwise return the default image
            return this.mediaUrl && this.mediaUrl.startsWith('images/')
                ? `https://panel.dinelim.ai/uploads/${this.mediaUrl}`
                : 'https://panel.dinelim.ai/uploads/images/1724355186_home_bg.jpg';
        },
        computedLogoUrl() {
            return this.logoUrl && this.logoUrl.startsWith('images/')
                ? `https://panel.dinelim.ai/uploads/${this.logoUrl}`
                : 'https://panel.dinelim.ai/uploads/images/1724332912_no-image.jpg';
        },
        activeMenuTabStyle(){
            return {
                background: this.mainBgColor,
                color:'#fff'
            }
        },
        activeMenuTabHoverStyle(){
            return {
                Cursor:'pointer',
                color:this.mainBgColor
            
            }
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
                return `https://panel.dinelim.ai/uploads/${this.mediaUrl}`;
            } catch (error) {
                console.error('Video not found:', error);
                return null;
            }
        },
        transformedLanguages() {
            return this.selectedLanguage.map(languageCode => {
                if (languageCode === 'en') {
                    return { name: 'EN', id: 0 };
                } else if (languageCode === 'ar') {
                    return { name: 'AR', id: 2 };
                }
                else if (languageCode === 'tr') {
                    return { name: 'TR', id: 1 };
                }
                else if (languageCode === 'fr') {
                    return { name: 'FR', id: 3 };
                }
                return { name: languageCode, id: null };
            });
        },
    },

    methods: {
        sLanguage(value) {

            this.selectedLanguageId = value;

        },
        formatLanguage(language) {
            return language.toUpperCase();
        },
      
        setActiveTab(tab) {
            this.selectedLanguageId = tab.id;
            console.log(this.selectedLanguageId)
            this.activeTab = tab.name;
            console.log(this.activeTab)

            this.setMenuActiveTab(this.activeMenuTab);
        },
        setMenuActiveTab(tab) {
            console.log(this.sideMenuItems)
            this.activeMenuTab = tab;
            const sortedMenuItems = this.sideMenuItems.filter((item) => item.group_id == tab);

            this.sortedSideMenuItems = sortedMenuItems.filter((item) => item.language_id == this.selectedLanguageId);

            this.activeProduct = sortedMenuItems[0].category_id;
            this.setSideMenuActiveProducts(this.activeProduct);

        },
        getButtonStyle(parentId) {
            console.log(parentId)
            if (this.activeMenuTab === parentId) {
                return this.activeMenuTabStyle; // Active style
            } else if (this.hoveredMenuTab === parentId) {
                return this.activeMenuTabHoverStyle; // Hover style
            } else {
                return {}; // Default style
            }
        },
        setSideMenuActiveProducts(id) {
            this.activeProduct = id;
            const sortedProductItems = this.productItems.filter((item) => item.category_id == id);
            this.sortedProductItems = sortedProductItems.filter((item) => item.language_id == this.selectedLanguageId);
            console.log(this.sortedProductItems)

        },
        toggleShareMenu() {
            this.isShareMenuVisible = !this.isShareMenuVisible;
        },
        view(mode) {
            this.mode = mode;
            console.log(this.mode)
        },
        isImage(url) {
            return /\.(jpeg|jpg|gif|png)$/i.test(url);
        },
        isVideo(url) {
            return /\.(mp4|webm|ogg)$/i.test(url);
        },
    },
    mounted() {

        if (this.menuList.length > 0) {
            this.activeMenuTab = this.menuList[0].parent_id;
            this.setMenuActiveTab(this.activeMenuTab); // Fetch data for the initial tab
        }
    },
    watch: {
        menuList(newMenuList) {
            console.log(newMenuList)
            if (newMenuList.length > 0 && !this.activeMenuTab) {
                this.activeMenuTab = newMenuList[0].parent_id;
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