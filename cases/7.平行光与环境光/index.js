import * as THREE from 'three'
// 引入扩展库 OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 创建一个三维场景 Scene
const scene = new THREE.Scene();

// 给三维场景添加物体

// 定义一个长方体，长宽高都是 100
const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
// 材质对象
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  // transparent: true, // 开启透明
  // opacity: 0.5 // 设置透明度
})


// 创建网格模型：表示生活中的物体
const mesh = new THREE.Mesh(boxGeometry, material);
mesh.position.set(0, 0, 0); // 设置三维模型在场景中的位置，默认在坐标原点
scene.add(mesh);

// 辅助观察的坐标系
const axisHelper = new THREE.AxesHelper(150);
scene.add(axisHelper);


// 创建点光源
const pointLight = new THREE.PointLight(0xfffff, 1.0, 0, 0)
pointLight.position.set(200, 100, 200);
pointLight.lookAt(mesh.position);
scene.add(pointLight);

// 可视化点光源
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
scene.add(pointLightHelper);

// 添加一个环境光
const ambient = new THREE.AmbientLight(0xfffff, 0.3)
scene.add(ambient);

// 添加一个平行光
const directionalLight = new THREE.DirectionalLight(0xfffff, 1);
directionalLight.position.set(100, 100,100);
directionalLight.target = mesh;
scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10, 0xff0000);
scene.add(directionalLightHelper);


// 定义相机输出画布的尺寸(单位：像素px)
const width = 800;
const height = 500;
// 设置相机的 4 个参数

// 创建一个透视投影相机对象 
const camera = new THREE.PerspectiveCamera(30, width/height, 0.1, 2000);
// 设置相机的位置
camera.position.set(300, 300, 300);

// 指向 mesh 对应的位置
camera.lookAt(mesh.position);

// 创建一个渲染器对象 
const render = new THREE.WebGLRenderer();
render.setSize(width, height); // cavans 画布宽高度

render.render(scene, camera); // 执行一个渲染操作，类似相机的拍照动作

// 把渲染结果添加到网页页面上
document.getElementById("webgl").appendChild(render.domElement);

// 创建一个相机控件对象
const controls = new OrbitControls(camera, render.domElement);
// 如果 OrbitControls 改变了相机参数，重新调用渲染
controls.addEventListener("change", ()=>{
  render.render(scene, camera) // 执行渲染操作
}); // 监听鼠标键盘事件 

