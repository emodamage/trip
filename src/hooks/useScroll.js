import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore'

export default function useScroll(elRef) {
  let el = window
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  // 监听Windows滚动，用来达到房间列表底部时自动请求数据
  const scrollListenerHandle = throttle(() => {
    if (el === window) {
      //文档的高度
      clientHeight.value = document.documentElement.clientHeight
      //文档滚动的距离
      scrollTop.value = document.documentElement.scrollTop
      //文档可滚动的高度
      scrollHeight.value = document.documentElement.scrollHeight 
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    // console.log(111)
    // console.log('clientHeight', clientHeight.value)
    // console.log('scrollTop', scrollTop.value)
    // console.log('scrollHeight', scrollHeight.value)
    // -1 是因为scrollTop有小数
    if (clientHeight.value + scrollTop.value >= scrollHeight.value - 1 ) {
      isReachBottom.value = true
      // console.log(222)
    }

  }, 1000)

  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener('scroll', scrollListenerHandle)
  })

  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListenerHandle)
  })

  return {
    isReachBottom,
    clientHeight,
    scrollTop,
    scrollHeight
  }
}