<template>
  <div class="app">
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <tab-bar-vant v-show="!route.meta.hideTabBar"></tab-bar-vant>
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