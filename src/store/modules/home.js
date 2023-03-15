import { defineStore } from 'pinia'

export default defineStore('storeHome', {
  state () {
    return {
      isHoverFloat: 1,
      isShowDigimakerBox: 1,
      isShowLastUpdateBox: 1,
      navTab: 1,
      lastUpdateGsapCatapult: 0,
      isShowRegisterBox: 1
    }
  },
  getters: {
     getIsHoverFloat:(state) => state.isHoverFloat,
     getIsShowDigimakerBox:(state) => state.isShowDigimakerBox,
     getIsShowLastUpdateBox:(state) => state.isShowLastUpdateBox,
     getNavTab:(state) => state.navTab,
     getLastUpdateGsapCatapult: (state) => state.lastUpdateGsapCatapult,
     getLastIsShowRegisterBox: (state) => state.isShowRegisterBox
  },
  actions: {
     setIsHoverFloat(isHoverFloat){
        this.isHoverFloat = isHoverFloat
     },
     setIsShowDigimakerBox(isShowDigimakerBox){
        this.isShowDigimakerBox = isShowDigimakerBox
     },
     setIsShowLastUpdateBox(isShowLastUpdateBox){
        this.isShowLastUpdateBox = isShowLastUpdateBox
     },
     setNavTab(navTab){
        this.navTab = navTab
     },
     setLastUpdateGsapCatapult(lastUpdateGsapCatapult){
        this.lastUpdateGsapCatapult = lastUpdateGsapCatapult
     },
     setLastIsShowRegisterBox(isShowRegisterBox){
        this.isShowRegisterBox = isShowRegisterBox
     }
  },
  persist: {
    enabled: false,
  },
})
