<template>
  <div class="city">
    <div class="top">
      <!-- 搜索框 -->
      <van-search 
        placeholder="城市/区域/位置" 
        v-model="searchValue"
        shape="round" 
        show-action
        @cancel="cancelClick"
      />
      <!-- tab切换 -->
      <van-tabs v-model:active="tabActive" color="#ff9854" line-height="2">
        <template v-for="(value, key, index) in allCities" :key="index">
          <van-tab 
            :title="value.title"
            :name="key"
          >
          </van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCities" :key="index">
        <city-group v-show="tabActive === key" :group-data="value"></city-group>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed  } from "vue";
import { storeToRefs } from "pinia";
import useCityStore from '@/stores/modules/city'
import { useRouter } from "vue-router";
import CityGroup from '@/views/city/cpns/city-group.vue'
const router = useRouter()
// 搜索框
const searchValue = ref('')
const cancelClick = () => {
  router.back()
}

// tab切换
const tabActive = ref()

// 请求的城市数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)
// 获取选中标签后的数据
// const currentGroup = computed(() => allCities.value[tabActive.value])


</script>

<style lang="less" scoped>
.city {
  .top {
    position: relative;
    z-index: 9;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>