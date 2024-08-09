<template>
  <div class="row card-menu"
    
    @start="dragging = true" @end="dragging = false" >
    <div style="width: 20px;display: flex;justify-content: center;align-items: center;">
      <i class="bi bi-grip-horizontal"></i>
    </div>
    <div style="width: 100%;max-width: 1270px;">
      <div style="display: flex;justify-content: space-between;">
        <div> <img :src="icon" :alt="title" height="50" class="filtered-image me-2">
          {{ title }}</div>
        <div>
          <i v-if="showEdit" class="bi bi-pencil-square me-2" @click="editItem" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"></i>
          <i v-if="showView" @click="viewItem" class="bi bi-eye"></i>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import "../assets/css/comps/MenuCard.css"
export default {
  name: 'CardComponent',
  props: {
    icon: String,
    title: String,
    subtitle: String,
    description: String,
    time: String,
    showEdit: {
      type: Boolean,
      default: false
    },
    showView: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    editItem() {
      this.$emit('edit');
    },
    viewItem() {
      this.$emit('view');
    }
  }
}
</script>
