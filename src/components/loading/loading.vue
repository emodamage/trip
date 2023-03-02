<template>
  <div class="loading" 
    v-if="mainStore.isLoading"
    @click="loadingClick"
  >
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="">
    </div>
  </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main';

const mainStore = useMainStore()
const loadingClick = () => {
  mainStore.isLoading = false
}
</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .5);
  .bg {
    width: 104px;
    height: 104px;
    background: url(@/assets/img/home/loading-bg.png) 0 0 / 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 70px;
      height: 70px;
    }
  }
}
</style>