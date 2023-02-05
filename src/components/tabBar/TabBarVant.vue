<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
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
import { ref } from 'vue'
import tabBarData from '@/assets/data/tabBar'
import { getAssetURL } from '@/utils/load_assets'

const currentIndex = ref(0)

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