<template>
  <!--轮播图-->
  <div class="swiper">
    <Swiper :modules="modules" :pagination="{ clickable: true }" :autoplay="{ delay: 3000, disableOnInteraction: false }"
            navigation>
      <SwiperSlide v-for="item in chatImageData">
        <img :src="item.imagePath" alt="">
      </SwiperSlide>

    </Swiper>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>

</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/css"
import { Pagination, Autoplay, Navigation } from "swiper"
import "swiper/css/pagination"
import "swiper/css/navigation"

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Pagination, Autoplay, Navigation],
      chatImageData: [
        {
          imagePath: "/src/assets/homePage/homeChartPic1.jpg",
        },
        {
          imagePath: "/src/assets/homePage/homeChartPic2.jpg",
        },
        {
          imagePath: "/src/assets/homePage/homeChartPic3.jpg",
        }
      ]
    }
  }
}
</script>

<style scoped>

.swiper {
  margin: 0;
  top: 0;
  left: 0;
  position: relative;
  z-index: 100;
  height: 100vh;
  width: 100vw;
}

.swiper img {
  width: 100%;
  height: 100%;
}

</style>