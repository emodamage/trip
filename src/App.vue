<template>
  <div class="app">
    <router-view></router-view>
    <tab-bar-vant v-if="!route.meta.hideTabBar"></tab-bar-vant>
    <loading></loading>
  </div>
</template>

<script setup>
import TabBarVant from '@/components/tabBar/TabBarVant.vue'
import Loading from '@/components/loading/loading.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<style scoped>

</style>