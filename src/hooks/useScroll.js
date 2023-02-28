import { onMounted, onUnmounted, ref } from 'vue';

export default function useScroll(reachBottomCallback) {
  const isReachBottom = ref(false)
  
  // 监听Windows滚动，用来达到房间列表底部时自动请求数据
  const scrollListenerHandle = () => {
    //文档的高度
    const clientHeight = document.documentElement.clientHeight
    //文档滚动的距离
    const scrollTop = document.documentElement.scrollTop
    //文档可滚动的高度
    const scrollHeight = document.documentElement.scrollHeight
    // -1 是因为scrollTop有小数
    if (clientHeight + scrollTop >= scrollHeight - 1) {
      if (reachBottomCallback) reachBottomCallback()
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', scrollListenerHandle)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', scrollListenerHandle)
  })

  return {
    isReachBottom
  }
}