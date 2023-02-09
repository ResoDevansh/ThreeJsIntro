import * as THREE from "three";
import { AmbientLight, GridHelper } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./style.css";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 10);
const material = new THREE.MeshBasicMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);
// renderer.render(scene, camera);
const pointLight = new THREE.PointLight(0xffffff);
const ambientLight = new THREE.AmbientLight(0xffffff);

pointLight.position.set(15, 2, 5);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
};
Array(200).fill().forEach(addStar);
const spaceTexture = new THREE.TextureLoader().load("./images/spacehd.avif");
scene.background = spaceTexture;
const animate = () => {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
};

const jeffTexture = new THREE.TextureLoader().load("./images/tree.png");
const tree = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jeffTexture })
);
const moonTexture = new THREE.TextureLoader().load('Moon.jpeg');
const normalTexture = new THREE.TextureLoader().load('craters.jfif');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);
scene.add(moon);
// scene.add()
const moveCamera = () => {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  tree.rotation.y += 0.01;
  tree.rotation.z += 0.01;

  camera.position.z = t * (-.01);
  camera.position.x = t * (-.0002);
  camera.position.y = t * (-.0002);
}
document.body.onscroll = moveCamera;
animate();
