import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gasp'
import { BufferGeometry } from "three";
import bear from '../assets/videos/bear.mp4'
console.log(OrbitControls);
// 目标：掌握gasp设置各种动画效果

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 10);
scene.add(camera);

// 创建几何体
for (let i = 0; i < 1; i++) {
  const geometry = new BufferGeometry()
  let bufferArray = new Float32Array(18)
  for (let j = 0; j < 12; j++) {
    bufferArray[j] = Math.random() * 20 - 5
    console.log(bufferArray[0]);
  }
  // const bufferArray = new Float32Array( [
  //   -1.0, -1.0,  1.0,
  //    1.0, -1.0,  1.0,
  //    1.0,  1.0,  1.0,
  // ] );
  // console.log(bufferArray);
  geometry.setAttribute('position', new THREE.BufferAttribute(bufferArray, 3))
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.5 })
  const video = document.createElement('video')
  video.src = bear
  video.muted = true
  video.autoplay = 'autoplay'
  video.loop = true

  const texture = new THREE.VideoTexture(video)
  // geometry.setAttribute('material', new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }))
  const videoMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
  video.play()
  const mesh = new THREE.Mesh(geometry, videoMaterial)
  console.log(mesh);
  scene.add(mesh)
}

var geometry = new THREE.PlaneGeometry(10, 20); //矩形平面
const video = document.createElement('video')
video.src = bear
video.muted = true
video.autoplay = 'autoplay'
video.loop = true

const texture = new THREE.VideoTexture(video)
const videoMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
video.play()
const mesh = new THREE.Mesh(geometry, videoMaterial)
scene.add(mesh)
console.log(mesh);
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 修改物体位置
// cube.position.set(5,0,0) // 两种方式都可以
// cube.position.x = 5;
// 缩放
// cube.scale.set(3,2,1)
// cube.scale.x= 5
// 旋转
// cube.rotation.set(Math.PI / 4, 0, 0);

// scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染尺寸
// renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true
controls.autoRotateSpeed = 10
controls.enableDamping = true
// controls.maxDistance = 10
// controls.minDistance = 10
// controls.dampingFactor = 1
// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
let left = true;



function render(time) {
  // console.log(time);
  // if (cube.position.x <= 0) {
  //   left = true;
  //   // cube.position.x += 0.01;
  // } else if (cube.position.x > 5) {
  //   left = false;
  //   // cube.position.x -= 0.01;
  // }
  // cube.position.x = left ? cube.position.x + 0.01 : cube.position.x - 0.01;
  // cube.rotation.x = left
  //   ? cube.rotation.x + Math.PI / 100
  //   : cube.rotation.x - Math.PI / 100;
  controls.update()
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
document.addEventListener('resize', render)
render();