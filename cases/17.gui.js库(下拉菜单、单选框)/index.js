import * as THREE from 'three'
// 引入扩展库 OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
// 引入 Stats 性能监视器
import Stats from 'three/addons/libs/stats.module.js'

const gui = new GUI()
gui.domElement.style.right = '0px';
gui.domElement.style.width = '300px';

// 创建一个对象，对象属性的值可以被 GUI 库创建的交互界面改变
const obj = {
  x: 30,
  y: 60,
  z: 50,
  scale: 0,
  color: 0x00ffff, // 材质颜色
  specular: 0xffffff, // 材质高光颜色
  bool: false
}

// gui 增加交互界面，用来改变 obj 对应属性

// 创建一个三维场景 Scene
const scene = new THREE.Scene();

// 定义一个长方体，长宽高都是 100
const geometry = new THREE.SphereGeometry(50);

// 材质对象
const material = new THREE.MeshPhongMaterial({
  color: 0x00ffff,
})
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);



gui.add(obj, 'scale', {
  left: -100,
  center: 0,
  right: 100
})
.name('方位选择')
.onChange((value)=>{
  mesh.position.x = value;
})

gui.add(obj, 'bool')
.name('是否旋转')



// 辅助观察的坐标系
const axisHelper = new THREE.AxesHelper(150);
scene.add(axisHelper);

// 添加一个环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambient);
// 添加一个平行光
const directionalLight = new THREE.DirectionalLight(0xfffff, 1);
directionalLight.position.set(200, 300, 350);
directionalLight.target = mesh;
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10, 0xff0000);
scene.add(directionalLightHelper);


// 创建材质子菜单
const matFolder = gui.addFolder('材质')
matFolder.close()
// 材质颜色
matFolder.addColor(obj, 'color').onChange((value)=>{
  material.color.set(value)
})
// 材质高光颜色
matFolder.addColor(obj, 'specular').onChange((value)=>{
  material.specular.set(value)
})

const lightFolder = gui.addFolder('环境光')

lightFolder.add(ambient, 'intensity', 0, 2).name('环境光强度').step(0.1);
lightFolder.add(directionalLight, 'intensity', 0, 2).name('平行光强度').step(0.1);
lightFolder.add(obj, 'x', 0, 180).onChange((value)=>{
  directionalLight.position.x = value
});
lightFolder.add(directionalLight.position, 'y', 0, 100);
lightFolder.add(directionalLight.position, 'z', 0, 100);


// 定义相机输出画布的尺寸(单位：像素px)
const width = window.innerWidth;
const height = window.innerHeight;

// 创建一个透视投影相机对象  设置相机的 4 个参数
const camera = new THREE.PerspectiveCamera(30, width/height, 0.1, 2000);
// 设置相机的位置
camera.position.set(300, 300, 300);
camera.lookAt(0, 0, 0)

console.log('查看当前屏幕设备像素比', window.devicePixelRatio);

// 创建一个渲染器对象 
const renderer = new THREE.WebGLRenderer({
  antialias: true // 启用抗锯齿
});
renderer.setSize(width, height); // cavans 画布宽高度
renderer.render(scene, camera); // 执行一个渲染操作，类似相机的拍照动作
renderer.setPixelRatio(window.devicePixelRatio); // 告诉threejs你的屏幕的设备像素比
renderer.setClearColor(0x444444)

// 把渲染结果添加到网页页面上
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock();// 创建一个时钟对象

const stats = new Stats();
document.body.appendChild(stats.domElement);

// 渲染循环 默认理想状态下每秒钟执行60次
function render() {
  stats.update();
  if(obj.bool) {
    mesh.rotateY(0.01);
  }
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
