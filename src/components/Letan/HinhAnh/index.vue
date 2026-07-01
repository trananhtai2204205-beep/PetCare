<template>
  <div class="gallery-page">
    <div class="gallery">
      <div
        class="gallery-item"
        v-for="(img, index) in images"
        :key="index"
        @click="showImage(index)"
      >
        <img
          :src="img"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          draggable="false"
          alt=""
        />
      </div>
    </div>

    <vue-easy-lightbox
      :visible="visible"
      :imgs="images"
      :index="current"
      @hide="visible = false"
    />
  </div>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";

export default {
  components: {
    VueEasyLightbox,
  },

  data() {
    return {
      visible: false,
      current: 0,

      images: [
        "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?auto=format&fit=crop&w=500&q=80",
      ],
    };
  },

  methods: {
    showImage(index) {
      this.current = index;
      this.visible = true;
    },
  },
};
</script>

<style scoped>
.gallery-page {
  padding: 30px 0;
  background: #fff;
}

.gallery {
  width: 90%;
  margin: auto;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.gallery-item {
  overflow: hidden;
  cursor: pointer;
  background: #f5f5f5;
}

.gallery-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;

  display: block;

  transition: transform 0.25s ease;

  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.gallery-item:hover img {
  transform: scale(1.03);
}

@media (max-width: 992px) {
  .gallery {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }

  .gallery-item img {
    height: 200px;
  }
}

@media (max-width: 576px) {
  .gallery {
    grid-template-columns: repeat(1, 1fr);
  }

  .gallery-item img {
    height: 250px;
  }
}
</style>