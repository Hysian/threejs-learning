import * as THREE from 'three'

// 创建一个三维场景 Scene
const scene = new THREE.Scene();

// 给三维场景添加物体

// 定义一个长方体，长宽高都是 100
const boxGeometry = new THREE.BoxGeometry(100, 100, 100);
// 材质对象
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000
})
// 创建网格模型：表示生活中的物体
const mesh = new THREE.Mesh(boxGeometry, material);
mesh.position.set(0, 0, 0); // 设置三维模型在场景中的位置，默认在坐标原点
scene.add(mesh);

// 定义相机输出画布的尺寸(单位：像素px)
const width = 800;
const height = 500;
// 设置相机的 4 个参数

// 创建一个透视投影相机对象 
const camera = new THREE.PerspectiveCamera(60, width/height, 10, 3000);
// 设置相机的位置
camera.position.set(300, 300, 300);

// 设置相机的视线，观察目标点的坐标
// camera.lookAt(0, 0 ,0);

// y轴上位置10
// camera.lookAt(0, 10, 0); 

// 指向 mesh 对应的位置
camera.lookAt(mesh.position);

// 创建一个渲染器对象
const render = new THREE.WebGLRenderer();
render.setSize(width, height); // cavans 画布宽高度

render.render(scene, camera); // 执行一个渲染操作，类似相机的拍照动作

// 把渲染结果添加到网页页面上
document.getElementById("webgl").appendChild(render.domElement);
