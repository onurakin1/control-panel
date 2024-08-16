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
                            <li v-for="language in languages" :key="language" :style="{
                                borderColor: mainBgColor,
                                backgroundColor: hovered === language ? mainBgColor : '',
                            }" @mouseenter="hovered = language" @mouseleave="hovered = null">
                                {{ language }}
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
                            <li>AR</li>
                            <li>EN</li>
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
                    <div class="menu-icon-item" @click="view('menu')" :class="{ 'disabled': disabled }">
                        <div class="icon-circle"
                            :style="{ backgroundColor: mainBgColor, height: iconSize, width: iconSize }">
                            <img src="~@/assets/img/icons/cat_2.png" alt="Food Icon" class="icon-image" />
                        </div>
                        <div class="icon-label" :style="{ color: mainBgColor }">FOOD</div>
                    </div>
                    <div class="menu-icon-item" :class="{ 'disabled': disabled }">
                        <div class="icon-circle"
                            :style="{ backgroundColor: mainBgColor, height: iconSize, width: iconSize }">
                            <img src="~@/assets/img/icons/cat_17 (1).png" alt="Beverage Icon" class="icon-image" />
                        </div>
                        <div class="icon-label" :style="{ color: mainBgColor }">BEVERAGE</div>
                    </div>
                    <div class="menu-icon-item" :class="{ 'disabled': disabled }">
                        <div class="icon-circle"
                            :style="{ backgroundColor: mainBgColor, height: iconSize, width: iconSize }">
                            <img src="~@/assets/img/icons/cat_25.png" alt="Shisha Icon" class="icon-image" />
                        </div>
                        <div class="icon-label" :style="{ color: mainBgColor }">SHISHA</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="menupage" v-else>

        <div class="d-flex" style="gap:20px;" :style="{ backgroundColor: secondaryBgColor }">
            <div class="d-flex flex-column flex-shrink-0 p-3 text-white vh-100" id="sidebar" style="width: 150px;"
                :style="{ backgroundColor: mainBgColor }">
                <ul class="nav nav-pills flex-column mb-auto">
                    <li v-for="(item, index) in sideMenuItems" :key="index" class="nav-item">
                        <router-link v-if="item.type === 'router-link'" :to="item.route"
                            class="nav-link text-white menu-item">
                            <img :src="item.image" :alt="item.name" class="card-img"
                                style="height: 80px;width: 80px;" />
                            <!-- <i :class="`bi ${item.icon} fs-4 mb-3`"></i> -->
                            <span class="nav-text">{{ item.name }}</span>
                        </router-link>
                        <a v-else-if="item.type === 'collapse'" :href="item.route" data-bs-toggle="collapse"
                            class="nav-link text-white menu-item">
                            <img :src="item.image" :alt="item.name" class="card-img"
                                style="height: 80px;width: 80px;" />
                            <span class="nav-text">{{ item.name }}</span>
                        </a>
                    </li>
                </ul>
            </div>





            <div class="tab-content product-content" id="pills-tabContent">

                <div class="menu-nav">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active tab-button" id="pills-home-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                aria-selected="true" @click="setMenuActiveTab('Food')"
                                :style="activeMenuTab === 'Food' ? activeMenuTabStyle : null">Food</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link tab-button" id="pills-profile-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                                aria-selected="false" @click="setMenuActiveTab('Drink')"
                                :style="activeMenuTab === 'Drink' ? activeMenuTabStyle : null">Drink</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link tab-button" id="pills-contact-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                aria-selected="false" @click="setMenuActiveTab('Beverage')"
                                :style="activeMenuTab === 'Beverage' ? activeMenuTabStyle : null">Beverage</button>
                        </li>
                    </ul>
                    <div class="back-btn" :style="{ backgroundColor: mainBgColor }" @click="view('home')">
                        <i class="bi bi-chevron-left"></i>
                    </div>
                </div>
                <div class="language_nav">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" :class="{ active: activeTab === 'EN' }" id="pills-home-tab"
                                data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab"
                                aria-controls="pills-home" aria-selected="true" @click="setActiveTab('EN')"
                                :style="activeTab === 'EN' ? activeTabStyle : color = mainBgColor">
                                EN
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" :class="{ active: activeTab === 'ES' }" id="pills-es-tab"
                                data-bs-toggle="pill" data-bs-target="#pills-es" type="button" role="tab"
                                aria-controls="pills-es" aria-selected="false" @click="setActiveTab('ES')"
                                :style="activeTab === 'ES' ? activeTabStyle : null">
                                ES
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" :class="{ active: activeTab === 'RU' }" id="pills-ru-tab"
                                data-bs-toggle="pill" data-bs-target="#pills-ru" type="button" role="tab"
                                aria-controls="pills-ru" aria-selected="false" @click="setActiveTab('RU')"
                                :style="activeTab === 'RU' ? activeTabStyle : null">
                                RU
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" :class="{ active: activeTab === 'TR' }" id="pills-tr-tab"
                                data-bs-toggle="pill" data-bs-target="#pills-tr" type="button" role="tab"
                                aria-controls="pills-tr" aria-selected="false" @click="setActiveTab('TR')"
                                :style="activeTab === 'TR' ? activeTabStyle : null">
                                TR
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" :class="{ active: activeTab === 'AR' }" id="pills-ar-tab"
                                data-bs-toggle="pill" data-bs-target="#pills-ar" type="button" role="tab"
                                aria-controls="pills-ar" aria-selected="false" @click="setActiveTab('AR')"
                                :style="activeTab === 'AR' ? activeTabStyle : null">
                                AR
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="product-items">
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel"
                            aria-labelledby="pills-home-tab">
                            <div class="row">
                                <div v-for="(item, index) in menuItems" :key="index" :class="colClass">
                                    <div class="menu-card" :style="{ backgroundColor: mainBgColor }">
                                        <img :src="item.image" :alt="item.name" class="card-img" />
                                        <div class="container">
                                            <h4><b :style="{ color: textColor, fontSize: fontSize }">{{ item.name }}</b>
                                            </h4>
                                            <p :style="{ color: textColor }">{{ item.price }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-profile" role="tabpanel"
                            aria-labelledby="pills-profile-tab">
                            <div class="row">
                                <div v-for="(item, index) in drinkMenuItems" :key="index" :class="colClass">
                                    <div class="menu-card" :style="{ backgroundColor: mainBgColor }">
                                        <img :src="item.image" :alt="item.name" class="card-img" />
                                        <div class="container">
                                            <h4><b :style="{ color: textColor, fontSize: fontSize }">{{ item.name }}</b>
                                            </h4>
                                            <p :style="{ color: textColor }">{{ item.price }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-contact" role="tabpanel"
                            aria-labelledby="pills-contact-tab">
                            <div class="row">
                                <div v-for="(item, index) in menuItems" :key="index" :class="colClass">
                                    <div class="menu-card" :style="{ backgroundColor: mainBgColor }">
                                        <img :src="item.image" :alt="item.name" class="card-img" />
                                        <div class="container">
                                            <h4><b :style="{ color: textColor, fontSize: fontSize }">{{ item.name }}</b>
                                            </h4>
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
            default: () => null
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
            activeMenuTab: 'Food',
            sideMenuItems: [
                {
                    name: 'Breakfast',
                    image: require('@/assets/img/icons/cat_101.png'),
                    route: '/',
                    type: 'router-link'
                },
                {
                    name: 'Soups',
                    image: require('@/assets/img/icons/cat_2 (1).png'),
                    route: '#submenu1',
                    type: 'collapse'
                },
                {
                    name: 'Fresh Salads',
                    image: require('@/assets/img/icons/cat_4.png'),
                    route: '#submenu2',
                    type: 'collapse'
                },
                {
                    name: 'Cold Starters',
                    image: require('@/assets/img/icons/cat_14.png'),
                    route: '/branch',
                    type: 'router-link'
                },
                {
                    name: 'Turkish Mezze',
                    image: require('@/assets/img/icons/cat_5.png'),
                    route: '#submenu2',
                    type: 'collapse'
                },
                {
                    name: 'Hot Starters',
                    image: require('@/assets/img/icons/cat_4.png'),
                    route: '#submenu2',
                    type: 'collapse'
                },
                {
                    name: 'PASTA&RISOTTO',
                    image: require('@/assets/img/icons/cat_6.png'),
                    route: '#submenu2',
                    type: 'collapse'
                }
            ],
            drinkMenuItems: [
                {
                    name: 'Affogato',
                    price: '12.00$',
                    image: require('@/assets/img/templates/menu_images/affogato.jpg'),
                },
                {
                    name: 'Lotus Affogato',
                    price: '16.00$',
                    image: require('@/assets/img/templates/menu_images/lotus.jpg'),
                },
                {
                    name: 'Oreo Affogato',
                    price: '18.00$',
                    image: require('@/assets/img/templates/menu_images/oreo.jpg'),
                }
            ],
            menuItems: [
                {
                    name: 'Breakfast Spread',
                    price: '55.00$',
                    image: require('@/assets/img/templates/menu_images/breakfast_spread.jpg'),
                },
                {
                    name: 'Omlette',
                    price: '9.00$',
                    image: require('@/assets/img/templates/menu_images/omlette.jpg'),
                },
                {
                    name: 'Sogus Plate',
                    price: '14.00$',
                    image: require('@/assets/img/templates/menu_images/sogus_plate.jpg'),
                },
                {
                    name: 'Cheese Plate',
                    price: '18.00$',
                    image: require('@/assets/img/templates/menu_images/cheese_plate.jpg'),
                },
                {
                    name: 'Menemen',
                    price: '12.00$',
                    image: require('@/assets/img/templates/menu_images/menemen.jpg'),
                },
                {
                    name: 'Fried Egg',
                    price: '9.00$',
                    image: require('@/assets/img/templates/menu_images/fried_egg.jpg'),
                },
                // Add more items as needed
            ],
        };
    },
    computed: {
        computedMediaUrl() {
            // Check if mediaUrl is valid, otherwise return the default image
            return this.mediaUrl && this.mediaUrl.startsWith('images/')
                ? `https://panel.dinelim.ai/uploads/${this.mediaUrl}`
                : require('@/assets/img/templates/templates1/home_bg.jpg');
        },
        computedLogoUrl() {
            return this.logoUrl && this.logoUrl.startsWith('images/')
                ? `https://panel.dinelim.ai/uploads/${this.logoUrl}`
                : require('@/assets/img/templates/templates1/logo_1000.png');
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
                return `https://panel.dinelim.ai/uploads/${this.mediaUrl}`;
            } catch (error) {
                console.error('Video not found:', error);
                return null;
            }
        },
        languages() {
            console.log(this.selectedLanguage);
            return this.selectedLanguage
                ? this.selectedLanguage.map(language => language.toUpperCase()) // Gelen dilleri büyük harfe çevir
                : ["AR", "EN"];
        }
    },
    methods: {
        setActiveTab(tab) {
            this.activeTab = tab;
        },
        setMenuActiveTab(tab) {
            this.activeMenuTab = tab;
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