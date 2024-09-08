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