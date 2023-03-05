<template>
  <div class="home" ref="homeRef">
    <home-nav-bar></home-nav-bar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <!-- 位置，入住时间等信息 -->
    <home-search-box></home-search-box>
    <!-- 新房特惠 -->
    <home-categories></home-categories>

    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar></search-bar>
    </div>
    <!-- 热门精选 -->
    <!-- 房间列表 -->
    <home-content></home-content>
  </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>
<script setup>
import HomeNavBar from './cpns/home-nav-bar.vue'
import HomeSearchBox from './cpns/home-search-box.vue'
import useHomeStore from '@/stores/modules/home';
import HomeCategories from '@/views/home/cpns/home-categories.vue'
import homeContent from '@/views/home/cpns/home-content.vue';
import SearchBar from '@/components/search-bar/search-bar.vue'
import useScroll from '@/hooks/useScroll'
import { watch, computed, ref, onActivated } from 'vue';

const homeStore = useHomeStore()
// 热门建议
homeStore.fetchHotSuggestData()
// 热门推荐
homeStore.fetchCategoriesData()
//房间列表
homeStore.fetchHouselistData()

// 监听滚动到底部自动刷新首页房间列表
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 搜索框
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 100
})

onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;
  box-sizing: border-box;
  height: 100vh;
  overflow-y: auto;
}
.banner {
  img {
    width: 100%;
  }
}
.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>