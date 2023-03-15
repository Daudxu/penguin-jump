import { defineStore } from 'pinia'

export default defineStore('storeApp', {
  state () {
    return {
      themeType: 'light',
      bgm: '',
    }
  },
  getters: {
     getThemeType: (state) => state.themeType,
     getBgm: (state) => state.bgm
  },
  actions: {
     setThemeType(themeType){
        this.themeType = themeType
     },
     setBgm(bgm){
        this.bgm = bgm
     }
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: sessionStorage, paths: ['themeType'] },
      { storage: sessionStorage, paths: ['bgm'] }
    ],
  },
})
