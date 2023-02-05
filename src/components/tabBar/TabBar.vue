<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabBarData" :key="index">
      <div 
        class="tab-bar-item" 
        :class="{ active: currentIndex === index }"
        @click="itemClick(item, index)"
      >
        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
        <img v-else :src="getAssetURL(item.imageActive)" alt="">
        <span class="text">{{item.text}}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import tabBarData from '@/assets/data/tabBar'
import { getAssetURL } from '@/utils/load_assets'

const currentIndex = ref(0)
const router = useRouter()
const itemClick = (item, index) => {
  currentIndex.value = index
  router.push(item.path)
}
</script>

<style lang="less" scoped>
.tab-bar {
  height: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #f3f3f3;
  position: fixed;
  display: flex;
  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.active {
      color: var(--primary-color);
    }
    .text {
      font-size: 12px;
    }
    img {
      width: 36px;
    }
  }
}
</style>