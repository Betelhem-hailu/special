import './style.css'
import * as THREE from 'three';

import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer();
const heartGeo = new THREE.BufferGeometry();
var hearts, loader, controls, audioloader;

function init() {
  camera.position.z = 1;
  camera.rotation.x = Math.PI / 2

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  loader = new FontLoader();

  loader.load('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('Let me hug u', {
      font: font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelenabled: true,
      bevelthickness: 8,
      bevelsize: 80,
      beveloffset: 0,
      bevelsegments: 5
    });


    textGeometry.computeBoundingBox();
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;


    textGeometry.translate(-textWidth / 2, 0, 0);

    const material = new THREE.MeshBasicMaterial({ color: 'white' });
    const textMesh = new THREE.Mesh(textGeometry, material);
    textMesh.position.set(0, 450, -250);
    scene.add(textMesh);
  });

  loader.load('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('Love You', {
      font: font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelenabled: true,
      bevelthickness: 8,
      bevelsize: 80,
      beveloffset: 0,
      bevelsegments: 5
    });


    textGeometry.computeBoundingBox();
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;


    textGeometry.translate(-textWidth / 2, 0, 0);

    const material = new THREE.MeshBasicMaterial({ color: 'white' });
    const textMesh = new THREE.Mesh(textGeometry, material);
    textMesh.position.set(50, 10, -990);
    scene.add(textMesh);
  });

  loader.load('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('I want to kiss you', {
      font: font,
      size: 80,
      height: 2,
      curveSegments: 12,
      bevelenabled: true,
      bevelthickness: 8,
      bevelsize: 80,
      beveloffset: 0,
      bevelsegments: 5
    });


    textGeometry.computeBoundingBox();
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;


    textGeometry.translate(-textWidth / 2, 0, 0);

    const material = new THREE.MeshBasicMaterial({ color: 'white' });
    const textMesh = new THREE.Mesh(textGeometry, material);
    textMesh.position.set(0, -800, -500);
    scene.add(textMesh);
  });

  loader.load('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('I just need ur smile', {
      font: font,
      size: 80,
      height: 2,
      curveSegments: 12,
      bevelenabled: true,
      bevelthickness: 8,
      bevelsize: 80,
      beveloffset: 0,
      bevelsegments: 5
    });


    textGeometry.computeBoundingBox();
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;


    textGeometry.translate(-textWidth / 2, 0, 0);

    const material = new THREE.MeshBasicMaterial({ color: 'white' });
    const textMesh = new THREE.Mesh(textGeometry, material);
    textMesh.position.set(50, -600, -800);
    scene.add(textMesh);
  });

  loader.load('https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry('Yene askeyami', {
      font: font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelenabled: true,
      bevelthickness: 8,
      bevelsize: 80,
      beveloffset: 0,
      bevelsegments: 5
    });


    textGeometry.computeBoundingBox();
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;


    textGeometry.translate(-textWidth / 2, 0, 0);

    const material = new THREE.MeshBasicMaterial({ color: 'white' });
    const textMesh = new THREE.Mesh(textGeometry, material);
    textMesh.position.set(20, 500, -650);
    scene.add(textMesh);
  });

  const directionalLight = new THREE.DirectionalLight(0xFF85A1, 50);
  directionalLight.position.set(0, 0, 50);
  scene.add(directionalLight);



  let statu = null;
  const gltfloader = new GLTFLoader();
  gltfloader.load('/scene.gltf', (gltf) => {
    console.log(gltf)
    statu = gltf.scene;


    statu.position.x = 10;
    statu.position.y = 1000;
    statu.position.z = -100;
    statu.rotation.x = 10;

    const radius = 1;
    statu.scale.set(radius, radius, radius)
    scene.add(statu);
  })

  controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', renderer);

  /***********************************************************************audio *********************************************************/

  const audioListener = new THREE.AudioListener();

  camera.add(audioListener);

  const sound = new THREE.Audio(audioListener);

  scene.add(sound);

  audioloader = new THREE.AudioLoader();


  audioloader.load(

    'sounds/like you.ogg',

    function (audioBuffer) {
      sound.setBuffer(audioBuffer);

      document.addEventListener('click', function () {
        sound.play();
      });
    },
  )

  /**********************************************************************************************************************************************/

  const heartCount = 6000;

  const positions = new Float32Array(heartCount * 3);

  for (let i = 0; i < heartCount; i++) {
    const x = Math.random() * 600 - 300;
    const y = Math.random() * 600 - 300;
    const z = Math.random() * 600 - 300;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
  }

  const velocities = new Float32Array(heartCount);

  for (let i = 0; i < heartCount; i++) {
    velocities[i] = 0;
  }
  const accelerations = new Float32Array(heartCount);

  for (let i = 0; i < heartCount; i++) {
    accelerations[i] = 0.02;
  }

  heartGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  heartGeo.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));
  heartGeo.setAttribute('acceleration', new THREE.BufferAttribute(accelerations, 1));
  let sprite = new THREE.TextureLoader().load('hearts.png');
  const heartMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 5,
    map: sprite
  });
  hearts = new THREE.Points(heartGeo, heartMaterial);
  scene.add(hearts);
  animate()
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  heartGeo.attributes.position.array.forEach((_, i) => {
    const velocity = heartGeo.attributes.velocity.array[i];
    const acceleration = heartGeo.attributes.acceleration.array[i];

    heartGeo.attributes.velocity.array[i] += acceleration;
    heartGeo.attributes.position.array[i * 3 + 1] -= velocity;

    if (heartGeo.attributes.position.array[i * 3 + 1] < -200) {
      heartGeo.attributes.position.array[i * 3 + 1] = 200;
      heartGeo.attributes.velocity.array[i] = 0;
    }
  });

  heartGeo.attributes.position.needsUpdate = true;
  heartGeo.attributes.velocity.needsUpdate = true;
  hearts.rotation.y += 0.002;

  onWindowResize();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

}

init();