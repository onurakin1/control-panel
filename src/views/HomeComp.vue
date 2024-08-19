<template>
  <div class="container mt-4">
    <h3>
      <div>{{ $t('controlPanel') }}</div>
    </h3>




    <div class="row">
      <div v-for="(card, index) in cards" :key="index" :class="cardClass">
        <router-link :to="card.link"  class="card control-panel shadow-sm mb-4">
          <div class="card-body d-flex flex-column align-items-center">
            <div class="icon-container">
              <i :class="card.iconClass + ' fs-1 text-white'"></i>
            </div>
            <h5 class="card-title mb-3">{{ $t(card.title) }}</h5>
            <p class="card-text text-center">{{ card.description }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/css/views/Home.css"
export default {
  
  name: "HomeComp",
  data() {
    return {
      file: null,
      cards: [
        {
          iconClass: "bi bi-person",
          title: "settings",
          description:
            "You can update your user information here...",
            link:"/settings"
        },
        {
          iconClass: "bi bi-list-task",
          title: "pooldatamanagement",
          description:
            "You can manage categories and products from here...",
            link:"/"
        },
        {
          iconClass: "bi-bar-chart-fill",
          title: "branchManagement",
          description:
            "You can manage your branch from here...",
            link:"/branch"
        },
        {
          iconClass: "bi bi-bug-fill",
          title: "feedback",
          description:
            "You can find customer comments here...",
            link:"/"
        },
        {
          iconClass: "bi bi-star-fill",
          title: "hits",
          description:
            "You can access Hit's products from here...",
            link:"/"
        },
      ],
    };
  },
  computed: {
    
    cardClass() {
      return {
        'col-md-4': true,
        'col-lg-4': window.innerWidth > 1200, // Büyük ekranlar için üçerli gösterim
        'col-lg-6': window.innerWidth <= 1200 && window.innerWidth > 992, // Tablet (md) boyutunda ikişerli gösterim
        'col-md-6': window.innerWidth <= 992, // Tablet boyutunda ikişerli gösterim
      };
    },
  },
  mounted() {

    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {

    handleResize() {
      this.$forceUpdate(); // Yeniden render işlemi
    },


  },
};
</script>

