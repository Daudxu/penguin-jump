<template>
  <div class="score-panel" @click="handleClickRestart">{{ score }}</div>
  <div class="cl-start-shade" v-if="isStart === 0">
     <div class="cl-start-main"> 
          <div class="cl-title"> jump</div>
          <swiper
            :effect="'cards'"
            :grabCursor="true"
            :modules="EffectCards"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            class="mySwiper"
          >
            <swiper-slide>
              <img src="@/assets/images/1.png" />
            </swiper-slide>
            <swiper-slide>
              <img src="@/assets/images/2.png" />
            </swiper-slide>
            <swiper-slide>
              <img src="@/assets/images/3.png" />
            </swiper-slide>
          </swiper>
          <svg id="cl-play" class="cl-play" width="176" height="45" viewBox="0 0 176 45" fill="none" xmlns="http://www.w3.org/2000/svg" @click="handleClickStart">
            <path d="M2.75076 43L9.63286 1.54546H27.5263C30.603 1.54546 33.1939 2.1527 35.2991 3.36719C37.4042 4.58168 38.9155 6.28871 39.8332 8.48828C40.7508 10.6879 40.9667 13.2585 40.4809 16.2003C39.9951 19.196 38.9155 21.7802 37.2422 23.9528C35.5824 26.1119 33.4638 27.7784 30.8864 28.9524C28.3225 30.1129 25.4482 30.6932 22.2635 30.6932H11.576L13.0334 21.9489H21.4539C22.8033 21.9489 23.9908 21.7195 25.0164 21.2607C26.042 20.7884 26.8719 20.1271 27.5061 19.277C28.1403 18.4134 28.5519 17.3878 28.7408 16.2003C28.9297 15.0128 28.842 14.0007 28.4777 13.1641C28.1268 12.3139 27.5196 11.6662 26.6559 11.2209C25.8058 10.7621 24.7195 10.5327 23.3971 10.5327H19.4297L14.005 43H2.75076Z" stroke="black" stroke-width="3"/>
            <path d="M44.147 43L51.0291 1.54546H62.2834L56.9396 33.9318H73.6996L72.1612 43H44.147Z" stroke="black" stroke-width="3"/>
            <path d="M91.469 43H79.3241L99.8894 1.54546H115.273L122.074 43H109.929L105.881 12.9617H105.557L91.469 43ZM91.9548 26.6449H114.787L113.33 35.0653H90.4974L91.9548 26.6449Z" stroke="black" stroke-width="3"/>
            <path d="M131.008 1.54546H143.558L148.821 18.3864H149.225L160.075 1.54546H172.625L152.707 29.9645L150.521 43H139.348L141.534 29.9645L131.008 1.54546Z" stroke="black" stroke-width="3"/>
          </svg>
     </div>
  </div>

</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import JumpGame from './object/JumpGame';
import Store from './store/index.js'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCards } from 'swiper';
import 'swiper/css/effect-cards';
import 'swiper/css';

const Pinia  = Store()
const score = computed(() => Pinia.useAppStore.getScore)
const isStart = ref(0)
const isRestart = ref(0)
let play
var bgm = new Audio('./audio/bgm.mp3');
let modelObj 
// play =  new JumpGame();
onMounted (async ()=>{
    let dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/gltf/");
    dracoLoader.setDecoderConfig({type: "js"});
    let loader = new  GLTFLoader();
    loader.setDRACOLoader(loader);
    const objModel = new Promise((resolve) =>{
        loader.load('./1.glb', (gltf) => {
            gltf.scene.traverse(c => {
                c.castShadow = true;
            });
            gltf.scene.scale.set(12, 12, 12)
            gltf.scene.position.set(0, -5.5, 0)
            gltf.scene.rotation.y = Math.PI / 2
            const clip = gltf.animations[0]
            const mixer = new THREE.AnimationMixer(gltf.scene)
            // mixer.timeScale=1/5;
            const action = mixer.clipAction(clip)
            action.play()
            resolve(gltf.scene)
        })
    })
    modelObj = await objModel


})

const handleClickStart = () => {
  // isStart.value = 1
  // isRestart.value = 1
  // play =  new JumpGame(modelObj);
  // play.start();
  // audioBgm()
  // const clPlay = document.querySelectorAll("#cl-play path")
  // console.log(clPlay)
  // for(let i = 0; i < clPlay.length; i++ ){
  // console.log(`第${i}个字长度为：${clPlay[i].getTotalLength()}`)
  // }
}

const handleClickRestart = () => {
  play.restart(modelObj);
}

const audioBgm = () => {
	bgm.volume = 0.75
	bgm.play();
  bgm.loop = true;
  Pinia.useAppStore.setBgm(bgm)
}
</script>

<style lang="stylus" scoped>
@font-face {
  font-family: myFirstFont;
  src: url('./assets/font/digital_number.ttf')
}
.score-panel {
    position: absolute;
    display: inline-block;
    left: 1em;
    top: 1.5em;
    font-size: 26px;
    font-family: myFirstFont;
}

.cl-start-shade {
  position: fixed;
  top: 0;
  width:100vw;
  height:100vh;
  z-index: 999;
  background: url("./assets/images/bg.jpg") no-repeat;
  background-size:cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .cl-start-main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .cl-title {
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  .cl-play {
    animation: fillAni 500ms ease forwards 1200ms

    path:nth-child(1){
      stroke-dasharray: 203
      stroke-dashoffset: 203
      animation: lineAni 2s ease forwards 
    }
    path:nth-child(2){
      stroke-dasharray: 140
      stroke-dashoffset: 140
      animation: lineAni 2s ease forwards 300ms
    }
    path:nth-child(3){
      stroke-dasharray: 254
      stroke-dashoffset: 254
      animation: lineAni 2s ease forwards 600ms
    }
    path:nth-child(4){
      stroke-dasharray: 165
      stroke-dashoffset: 165
      animation: lineAni 2s ease forwards 900ms
    }
  }
}


.swiper {
  width: 240px;
  height: 320px;
  margin-bottom: 16px
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  img {
    width: 200px
  }
}

.swiper-slide:nth-child(1n) {
  background-color: #43a8e2
}

.swiper-slide:nth-child(2n) {
  background-color: #43a8e2
}

.swiper-slide:nth-child(3n) {
  background-color: #43a8e2
}

@keyframes lineAni {
  to {
     stroke-dashoffset: 0
  }
}
@keyframes fillAni {
  from {
    fill: transparent
  }
  to {
    fill: #ffffff
  }
}

@keyframes bounce {
  0% {
    transform: translate3d(0, 0, 0);
    text-shadow: rgba(255, 255, 255, 0.4) 0 0 0.05em;
  }
  100% {
    transform: translate3d(0, -1em, 0);
    text-shadow: rgba(255, 255, 255, 0.4) 0 1em 0.35em;
  }
}


</style>
