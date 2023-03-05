<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control 
      :titles="names"
      class="tabs"
      v-if="showTabControl"
      @tab-item-click="tabClick"
      ref="tabControlRef"
    >
    </tab-control>
    <van-nav-bar
      title="房间详情"
      left-text="返回"
      left-arrow
      @click-left="onclickLeft"
    >
      <template #right>
        <van-icon name="search"></van-icon>
      </template>
    </van-nav-bar>
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"></detail-swipe>
      <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"></detail-infos>
      <detail-facility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"></detail-facility>
      <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"></detail-landlord>
      <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"></detail-comment>
      <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"></detail-notice>
      <detail-map name="地图" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"></detail-map>
      <detail-intro :price-intro="mainPart.introductionModule"></detail-intro>
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">一起去旅行</div>
    </div>  

  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { getDetailInfos } from '@/services/index'
import { computed, ref, watch } from "vue"
import TabControl from '@/components/tab-control/tab-control.vue'
import DetailSwipe from './cpns/detail-swipe.vue'
import DetailInfos from './cpns/detail-infos.vue'
import DetailFacility from './cpns/detail-facility.vue'
import DetailLandlord from './cpns/detail-landlord.vue'
import DetailComment from './cpns/detail-comment.vue'
import DetailNotice from './cpns/detail-notice.vue'
import DetailMap from './cpns/detail-map.vue'
import DetailIntro from './cpns/detail-intro.vue'
import useScroll from "@/hooks/useScroll";
const route = useRoute()
const router = useRouter()
const houseId = route.params.id

const detailInfos = ref([])
const mainPart = computed(() => detailInfos.value.mainPart)

//获取房间的详细信息
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})
const onclickLeft = () => {
  router.back()
}

// tabControl（滚到一定位置显示）相关逻辑
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})

// 点击tabControl会滚动到相应的位置
const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})

const getSectionRef = (value) => {
  if (!value) return
  const name = value.$el.getAttribute('name')
  sectionEls.value[name] = value.$el
}

let isClick = false
let currentDistance = -1
const tabClick = (index) => {
  // const key = Object.keys(sectionEls.value)[index]
  const key = names.value[index]
  const el = sectionEls.value[key]
  let distance = el.offsetTop
  if (index !== 0) {
    distance = distance - 44
  }

  isClick = true
  currentDistance = distance

  detailRef.value.scrollTo({
    top: distance,
    behavior: 'smooth'
  })
}

// 页面滚动时对应的tabControl也会随之变化
const tabControlRef = ref()
watch(scrollTop, (newValue) => {
  // console.log('newValue', newValue)
  
  newValue = parseInt(newValue)
  // console.log(parseInt(newValue))
  // console.log('currentDistance', currentDistance)
  if (newValue === currentDistance) {
    // console.log(111)
    isClick = false
  }
  if (isClick) return
  // 获取每个区域的scrollTop值
  const els = Object.values(sectionEls.value)
  const values = els.map(el => el.offsetTop)
  
  // 根据newValue找到相应的索引
  let index = values.length - 1
  for(let i = 0; i < values.length; i++) {
    // +44是因为顶部的tabControl遮盖了一部分
    if (values[i] > newValue + 44) {
      index = i -1
      break
    }
  }
  // console.log(index)
  tabControlRef.value?.setCurrentIndex(index)
})
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>