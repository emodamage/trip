<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
      <template #indicator="{ active, total}">
        
        <!-- <div class="indicator">
          {{ active }}/{{ swipeData.length }}-{{ total }}
        </div> -->
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <!-- 获取不到外层的index值 -->
            <span class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key}">
              <span class="text">
                {{ getName(value[0].title) }}
              </span>
              <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                {{ getCategoryIndex(swipeData[active]) + 1 }}/{{ value.length }}
              </span> 
            </span>   
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  swipeData: {
    type: Array,
    default: () => []
  }
})

// 对数据进行转换
const swipeGroup = {}
for (const item of props.swipeData) {
  // let valueArray = swipeGroup[item.enumPictureCategory]
  // if (!valueArray) {
  //   valueArray = []
  //   swipeGroup[item.enumPictureCategory] = valueArray
  // }
  swipeGroup[item.enumPictureCategory] ??= []
  // console.log(valueArray)
  swipeGroup[item.enumPictureCategory].push(item)
}
// console.log(swipeGroup)

// 将轮播图右下角的tiele去掉冒号
const nameReg = /【(.*?)】/i
const getName = (name) => {
  const results = /【(.*?)】/i.exec(name)
  return results[1]
}

const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item)
}

</script>

<style lang="less" scoped>
.swipe {
  .swipe-list {
    .item {
      img {
        width: 100%;
      }
    }
    .indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, .8);
      .item {
        margin: 0 3px;
        &.active {
          background-color: #fff;
          color: #333;
          padding: 0 3px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>