import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore'

export default function useScroll() {
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  // 监听Windows滚动，用来达到房间列表底部时自动请求数据
  const scrollListenerHandle = throttle(() => {
    //文档的高度
    clientHeight.value = document.documentElement.clientHeight
    //文档滚动的距离
    scrollTop.value = document.documentElement.scrollTop
    //文档可滚动的高度
    scrollHeight.value = document.documentElement.scrollHeight 
    // -1 是因为scrollTop有小数
    if (clientHeight.value + scrollTop.value >= scrollHeight.value - 1 ) {
      isReachBottom.value = true
    }

  }, 1000)

  onMounted(() => {
    window.addEventListener('scroll', scrollListenerHandle)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListenerHandle)
  })

  return {
    isReachBottom,
    clientHeight,
    scrollTop,
    scrollHeight
  }
}