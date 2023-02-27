<template>
  <div class="home">
    <home-nav-bar></home-nav-bar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box></home-search-box>
    <!-- 新房特惠 -->
    <home-categories></home-categories>
    <!-- 热门精选 -->
    <home-content></home-content>
    <button @click="moreBtnClick">加载更多</button>
  </div>
</template>

<script setup>
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import useHomeStore from '@/stores/modules/home';
import HomeCategories from '@/views/home/cpns/home-categories.vue'
import homeContent from '@/views/home/cpns/home-content.vue';

const homeStore = useHomeStore()
// 热门建议
homeStore.fetchHotSuggestData()
// 热门推荐
homeStore.fetchCategoriesData()
//房间列表
homeStore.fetchHouselistData()

const moreBtnClick = () => {
  homeStore.fetchHouselistData()
}
</script>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}
</style>