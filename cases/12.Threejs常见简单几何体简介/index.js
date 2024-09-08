import * as THREE from 'three'
// 引入扩展库 OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// 引入 Stats 性能监视器
import Stats  from 'three/addons/libs/stats.module.js'

// 创建一个三维场景 Scene
const scene = new THREE.Scene();

// 给三维场景添加物体

// 定义一个长方体，长宽高都是 100
// const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
// const geometry = new THREE.SphereGeometry(50);  
// const geometry = new THREE.CylinderGeometry(50, 50, 100);
const geometry = new THREE.PlaneGeometry(100, 50);
// const geometry = new THREE.CircleGeometry(50);

// 材质对象
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  transparent: true, // 开启透明
  opacity: 0.8, // 设置透明度
  side: THREE.DoubleSide // 双面可见
})
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);

// 辅助观察的坐标系
const axisHelper = new THREE.AxesHelper(150);
scene.add(axisHelper);


// 添加一个平行光
const directionalLight = new THREE.DirectionalLight(0xfffff, 1);
directionalLight.position.set(100, 100,100);
directionalLight.target = mesh;
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10, 0xff0000);
scene.add(directionalLightHelper);


// 定义相机输出画布的尺寸(单位：像素px)
const width = window.innerWidth;
const height = window.innerHeight;
// 设置相机的 4 个参数

// 创建一个透视投影相机对象 
const camera = new THREE.PerspectiveCamera(30, width/height, 0.1, 2000);
// 设置相机的位置
camera.position.set(300, 300, 300);
camera.lookAt(0, 0, 0)


// 创建一个渲染器对象 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); // cavans 画布宽高度

renderer.render(scene, camera); // 执行一个渲染操作，类似相机的拍照动作

// 把渲染结果添加到网页页面上
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock();// 创建一个时钟对象

const stats = new Stats();
document.body.appendChild(stats.domElement);

// 渲染循环 默认理想状态下每秒钟执行60次
function render() {
  stats.update();
  const spt = clock.getDelta()*1000;// 单位毫秒
  console.log("spt", spt);
  console.log("渲染帧率", 1000/spt);
  renderer.render(scene, camera); // 周期性相机渲染，更新 canvas 内容
  requestAnimationFrame(render);
}
render();

// 创建一个相机控件对象
const controls = new OrbitControls(camera, renderer.domElement);
// 如果 OrbitControls 改变了相机参数，重新调用渲染
controls.addEventListener("change", ()=>{
  // renderer.render(scene, camera) // 执行渲染操作
}); // 监听鼠标键盘事件 


window.onresize = function () {
  // 重新渲染 canvas 尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 重新设置相机的 aspect
  camera.aspect = window.innerWidth / window.innerHeight;
  // 渲染器执行 render 方法时会读取相机对象的投影矩阵属性 projectionMatrix
  // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵（节约计算资源）
  // 如果相机的一些属性发生了变化，需要执行 updateProjectionMatrix
  camera.updateProjectionMatrix();
}
