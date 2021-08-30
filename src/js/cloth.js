// import * as THREE from "three";
// import { Cloth } from "./components/cloth";
// import { OrbitControls } from "./components/OrbitControls";

// const params = {
//   enableWind: true,
//   showBall: false,
//   togglePins: togglePins,
// };

// const MASS = 0.1;
// const xSegs = 10;
// const ySegs = 10;

// // force
// const GRAVITY = 981 * 1.4;
// const gravity = new THREE.Vector3(0, -GRAVITY, 0).multiplyScalar(MASS);
// const windForce = new THREE.Vector3(0, 0, 0);
// const tmpForce = new THREE.Vector3();

// const TIMESTEP = 18 / 1000;
// const TIMESTEP_SQ = TIMESTEP * TIMESTEP;

// const diff = new THREE.Vector3();

// let pins = [];

// /* testing cloth simulation */
// const cloth = new Cloth(MASS, xSegs, ySegs);

// const pinsFormation = [];

// pins = [6];
// pinsFormation.push(pins);

// pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// pinsFormation.push(pins);

// pins = [0];
// pinsFormation.push(pins);

// pins = []; // cut the rope ;)
// pinsFormation.push(pins);

// pins = [0, cloth.w]; // classic 2 pins
// pinsFormation.push(pins);

// pins = pinsFormation[1];

// function togglePins() {
//   pins = pinsFormation[~~(Math.random() * pinsFormation.length)];
// }

// let container, stats;
// let camera, scene, renderer;

// let clothGeometry;
// let sphere;
// let object;

// init();
// animate(0);

// function init() {
//   container = document.createElement("div");
//   document.body.appendChild(container);

//   // scene

//   scene = new THREE.Scene();
//   scene.background = new THREE.Color(0xcce0ff);
//   scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);

//   // camera

//   camera = new THREE.PerspectiveCamera(
//     30,
//     window.innerWidth / window.innerHeight,
//     1,
//     10000
//   );
//   camera.position.set(1000, 50, 1500);
//   camera.lookAt(0, 0, 0);

//   // lights

//   scene.add(new THREE.AmbientLight(0x666666));

//   const light = new THREE.DirectionalLight(0xdfebff, 1);
//   light.position.set(50, 200, 100);
//   light.position.multiplyScalar(1.3);

//   light.castShadow = true;

//   light.shadow.mapSize.width = 1024;
//   light.shadow.mapSize.height = 1024;

//   const d = 300;

//   light.shadow.camera.left = -d;
//   light.shadow.camera.right = d;
//   light.shadow.camera.top = d;
//   light.shadow.camera.bottom = -d;

//   light.shadow.camera.far = 1000;

//   scene.add(light);

//   // cloth material

//   const loader = new THREE.TextureLoader();
//   const clothTexture = loader.load("textures/patterns/circuit_pattern.png");
//   clothTexture.anisotropy = 16;

//   const clothMaterial = new THREE.MeshLambertMaterial({
//     alphaMap: clothTexture,
//     side: THREE.DoubleSide,
//     alphaTest: 0.5,
//   });

//   // cloth geometry

//   clothGeometry = new THREE.ParametricBufferGeometry(
//     cloth.clothFunction,
//     cloth.w,
//     cloth.h
//   );
//   cloth.clothGeometry = clothGeometry;
//   cloth.pins = pins;
//   cloth.gravity = gravity;

//   // cloth mesh

//   object = new THREE.Mesh(clothGeometry, clothMaterial);
//   object.position.set(0, 0, 0);
//   object.castShadow = true;
//   scene.add(object);

//   // sphere

//   // const ballGeo = new THREE.SphereGeometry(ballSize, 32, 16);
//   // const ballMaterial = new THREE.MeshLambertMaterial();

//   // sphere = new THREE.Mesh(ballGeo, ballMaterial);
//   // sphere.castShadow = true;
//   // sphere.receiveShadow = true;
//   // sphere.visible = false;
//   // scene.add(sphere);

//   // ground

//   const groundTexture = loader.load("textures/terrain/grasslight-big.jpg");
//   groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
//   groundTexture.repeat.set(25, 25);
//   groundTexture.anisotropy = 16;
//   groundTexture.encoding = THREE.sRGBEncoding;

//   const groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });

//   let mesh = new THREE.Mesh(
//     new THREE.PlaneGeometry(20000, 20000),
//     groundMaterial
//   );
//   mesh.position.y = -250;
//   mesh.rotation.x = -Math.PI / 2;
//   mesh.receiveShadow = true;
//   scene.add(mesh);

//   // poles

//   const poleGeo = new THREE.BoxGeometry(5, 375, 5);
//   const poleMat = new THREE.MeshLambertMaterial();

//   mesh = new THREE.Mesh(poleGeo, poleMat);
//   mesh.position.x = -125;
//   mesh.position.y = -62;
//   mesh.receiveShadow = true;
//   mesh.castShadow = true;
//   scene.add(mesh);

//   mesh = new THREE.Mesh(poleGeo, poleMat);
//   mesh.position.x = 125;
//   mesh.position.y = -62;
//   mesh.receiveShadow = true;
//   mesh.castShadow = true;
//   scene.add(mesh);

//   mesh = new THREE.Mesh(new THREE.BoxGeometry(255, 5, 5), poleMat);
//   mesh.position.y = -250 + 750 / 2;
//   mesh.position.x = 0;
//   mesh.receiveShadow = true;
//   mesh.castShadow = true;
//   scene.add(mesh);

//   const gg = new THREE.BoxGeometry(10, 10, 10);
//   mesh = new THREE.Mesh(gg, poleMat);
//   mesh.position.y = -250;
//   mesh.position.x = 125;
//   mesh.receiveShadow = true;
//   mesh.castShadow = true;
//   scene.add(mesh);

//   mesh = new THREE.Mesh(gg, poleMat);
//   mesh.position.y = -250;
//   mesh.position.x = -125;
//   mesh.receiveShadow = true;
//   mesh.castShadow = true;
//   scene.add(mesh);

//   // renderer

//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerHeight);

//   container.appendChild(renderer.domElement);

//   renderer.outputEncoding = THREE.sRGBEncoding;

//   renderer.shadowMap.enabled = true;

//   // controls
//   const controls = new OrbitControls(camera, renderer.domElement);
//   controls.maxPolarAngle = Math.PI * 0.5;
//   controls.minDistance = 1000;
//   controls.maxDistance = 5000;

//   // performance monitor

//   // stats = new Stats();
//   // container.appendChild(stats.dom);

//   //

//   window.addEventListener("resize", onWindowResize);

//   //

//   // const gui = new GUI();
//   // gui.add(params, "enableWind").name("Enable wind");
//   // gui.add(params, "showBall").name("Show ball");
//   // gui.add(params, "togglePins").name("Toggle pins");
// }

// //

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// //

// function animate(now) {
//   requestAnimationFrame(animate);

//   cloth.simulate(now);
//   // simulate(now);
//   render();
//   // stats.update();
// }

// function render() {
//   cloth.render();
//   renderer.render(scene, camera);
// }

// function satisfyConstraints(p1, p2, distance) {
//   diff.subVectors(p2.position, p1.position);
//   const currentDist = diff.length();
//   if (currentDist === 0) return; // prevents division by 0
//   const correction = diff.multiplyScalar(1 - distance / currentDist);
//   const correctionHalf = correction.multiplyScalar(0.5);
//   p1.position.add(correctionHalf);
//   p2.position.sub(correctionHalf);
// }

// function simulate(now) {
//   const windStrength = Math.cos(now / 7000) * 20 + 40;

//   windForce.set(
//     Math.sin(now / 2000),
//     Math.cos(now / 3000),
//     Math.sin(now / 1000)
//   );
//   windForce.normalize();
//   windForce.multiplyScalar(windStrength);

//   // Aerodynamics forces

//   const particles = cloth.particles;

//   if (params.enableWind) {
//     let indx;
//     const normal = new THREE.Vector3();
//     const indices = clothGeometry.index;
//     const normals = clothGeometry.attributes.normal;

//     for (let i = 0, il = indices.count; i < il; i += 3) {
//       for (let j = 0; j < 3; j++) {
//         indx = indices.getX(i + j);
//         normal.fromBufferAttribute(normals, indx);
//         tmpForce.copy(normal).normalize().multiplyScalar(normal.dot(windForce));
//         particles[indx].addForce(tmpForce);
//       }
//     }
//   }

//   for (let i = 0, il = particles.length; i < il; i++) {
//     const particle = particles[i];
//     particle.addForce(gravity);

//     particle.integrate(TIMESTEP_SQ);
//   }

//   // Start Constraints

//   const constraints = cloth.constraints;
//   const il = constraints.length;

//   for (let i = 0; i < il; i++) {
//     const constraint = constraints[i];
//     satisfyConstraints(constraint[0], constraint[1], constraint[2]);
//   }

//   // Ball Constraints

//   // ballPosition.z = -Math.sin(now / 600) * 90; //+ 40;
//   // ballPosition.x = Math.cos(now / 400) * 70;

//   // if (params.showBall) {
//   //   sphere.visible = true;

//   //   for (let i = 0, il = particles.length; i < il; i++) {
//   //     const particle = particles[i];
//   //     const pos = particle.position;
//   //     diff.subVectors(pos, ballPosition);
//   //     if (diff.length() < ballSize) {
//   //       // collided
//   //       diff.normalize().multiplyScalar(ballSize);
//   //       pos.copy(ballPosition).add(diff);
//   //     }
//   //   }
//   // } else {
//   //   sphere.visible = false;
//   // }

//   // Floor Constraints

//   for (let i = 0, il = particles.length; i < il; i++) {
//     const particle = particles[i];
//     const pos = particle.position;
//     if (pos.y < -250) {
//       pos.y = -250;
//     }
//   }

//   // Pin Constraints
//   for (let i = 0, il = pins.length; i < il; i++) {
//     const xy = pins[i];
//     const p = particles[xy];
//     p.position.copy(p.original);
//     p.previous.copy(p.original);
//   }
// }
