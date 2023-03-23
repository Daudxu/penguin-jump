import Box from './Box';
// import {CylinderGeometry, Mesh, MeshLambertMaterial} from "three";
import * as THREE from "three";

export default class CylinderBox extends Box {
  constructor(prev) {
    super(prev)
  }

  // 生成盒子
  initBox() {

    const geometry = new THREE.CylinderGeometry(this.size/2, this.size/2, this.height, 50);
    // const material = new THREE.MeshLambertMaterial({color: this.color,});
    const textureLoader = new THREE.TextureLoader();
    const material1 = new THREE.MeshLambertMaterial({
      map: textureLoader.load('./textures/box.jpg'),
    })
    const material2 = new THREE.MeshLambertMaterial({
      map: textureLoader.load('./textures/ice.png'),
    })
    geometry.translate(0, this.height/2, 0);
    this.mesh = new THREE.Mesh(geometry, [material1, material2]);
  }
}
