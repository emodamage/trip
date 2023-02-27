import { defineStore } from "pinia";
import hyRequest from '@/services/request/index'
import { getHomeHotSuggests, getHomeCategories, getHomeHouselist } from "@/services";

const useHomeStore = defineStore('home',{
  state: () => ({
    hotSuggests: [], //home页面中开始搜索的上面（天河区。。）
    categories: [], //home页面中开始搜索的下面(新房特惠。。)
    
    currentPage: 1,
    houselist: [], //home页面中房间列表信息
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
    async fetchHouselistData() {
      const res = await getHomeHouselist(this.currentPage)
      this.houselist.push(...res.data)
      this.currentPage++
    }
  }
}) 

export default useHomeStore