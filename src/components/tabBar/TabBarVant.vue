<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabBarData" :key="index">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
            <img v-else :src="getAssetURL(item.imageActive)" alt="">
          </template>
        </van-tabbar-item>
        <!-- :deep()html -->
        <!-- <van-tabbar-item :to="item.path" icon="home-o">
          <span>{{ item.text }}</span>
        </van-tabbar-item> -->
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import tabBarData from '@/assets/data/tabBar'
import { getAssetURL } from '@/utils/load_assets'
import { useRoute } from 'vue-router'

// 手动切换url时底部的tabar也会相应做出改变
const route = useRoute()
const currentIndex = ref(0)
watch(route, (newRoute) => {
  const index = tabBarData.findIndex(item => item.path === newRoute.path)
  if (index === -1) return
  currentIndex.value = index
})
</script>

<style lang="less" scoped>
.tab-bar {
  // :deep(.class)找到第三方子组件中的类，让第三方子组件的类可以生效
  // 穿透
  // :deep(.vant-tabbar-item__icon) {
  //   font-size: 50px;
  // }
  img {
    height: 30px;
  }
}
</style>