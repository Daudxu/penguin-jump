import Stage from './Stage';
import BoxGroup from './BoxGroup';
import LittleMan from './LittleMan.js';
import {setFrameAction} from '../utils/TweenUtil';

export default class JumpGame {

  constructor (modelObj) {
    // 舞台
    this.stage = null;
    // 盒子组
    this.boxGroup = null;
    // 小人
    this.littleMan = null;
    // 游戏初始化
    this.init(modelObj);
  }

  init(modelObj) {
    // 初始化舞台
    this.stage = new Stage();
    // 初始化盒子
    this.initBoxes();
    // 初始化小人
    this.initLittleMan(modelObj);
    // 每次动画后都要渲染
    setFrameAction(this.stage.render.bind(this.stage));
  }

  initBoxes() {
    this.boxGroup = new BoxGroup();
    // 初始化首个盒子
    this.boxGroup.createBox();
    // 初始化第二个盒子
    this.boxGroup.createBox();
    // 盒子加入场景
    this.boxGroup.enterStage(this.stage);
  }

  initLittleMan(modelObj) {

    // 小人初始化
    this.littleMan =  new LittleMan(this.stage, this.boxGroup, modelObj);
    // 将小人给盒子一份，方便盒子移动的时候带上小人
    this.boxGroup.setLittleMan(this.littleMan);
    // 加入舞台
    this.littleMan.enterStage(this.stage);
    // 更新盒子和小人的位置
    this.boxGroup.updatePosition({
      duration: 0
    });
  }

  start() {
    this.stage.render();
  }

  // 重新开始
  async restart(modelObj) {
   const res = await this.stage.restart();
   if(res) {
    // 初始化盒子
    this.initBoxes();
    // 初始化小人
    this.initLittleMan(modelObj);
    
    // 每次动画后都要渲染
    this.stage.render();
    const _this = this
    setInterval(()=>{
      _this.stage.render();
    }, 500)
   }
  }

}
