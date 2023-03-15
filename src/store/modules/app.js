import { defineStore } from 'pinia'

export default defineStore('storeApp', {
  state () {
    return {
      themeType: 'light',
      cpTab: 'dashboard',
      isSpreadOut: 0,
      mobileNavIsShow: 0,
    }
  },
  getters: {
     getThemeType: (state) => state.themeType,
     getCpTab: (state) => state.cpTab,
     getIsSpreadOut: (state) => state.isSpreadOut,
     getMobileNavIsShow: (state) => state.mobileNavIsShow
  },
  actions: {
     setThemeType(themeType){
        this.themeType = themeType
     },
     setCpTab(cpTab){
        this.cpTab = cpTab
     },
     setIsSpreadOut(isSpreadOut){
        this.isSpreadOut = isSpreadOut
     },
     setMobileNavIsShow(mobileNavIsShow){
        this.mobileNavIsShow = mobileNavIsShow
     }
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: sessionStorage, paths: ['themeType'] }
      // { storage: sessionStorage, paths: ['cpTab'] }
    ],
  },
})
