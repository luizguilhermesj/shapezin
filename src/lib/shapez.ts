import * as THREE from 'three';
import { Sector } from './Sector';
import { Orbit } from './Camera';
import { PathNode } from './PathNode';
import { Space } from './Space';
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js';
import { Source } from './Source';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


const orbit = new Orbit(renderer);
const scene = new THREE.Scene();
const space = new Space(scene);

const light = new THREE.AmbientLight(0xffffff, 1.4)
light.position.set(0,15,15)
scene.add(light)

const sectors: Sector[] = [];
const sector = new Sector();
sectors.push(sector);
sector.addToScene(scene)


const vortexMesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    wireframe: false,
    color: 0xff00ff,
  })
);
space.add(vortexMesh);


const source = new Source(new THREE.Vector3(3,0,3))
space.add(source.object);


const mousePosition = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
let intersects;
const handleKeyDown = () => {
    orbit.updateCameraPosition();
}
window.addEventListener('mousemove', function (e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mousePosition, orbit.camera);
    intersects = raycaster.intersectObject(sector.planeMesh);
    if (intersects.length > 0) {
        const intersect = intersects[0];
        const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
        // let x = highlightPos.x - (highlightPos.x % 5)
        // let z = highlightPos.z - (highlightPos.z % 5)

        // x = x > 0 ? x + 2.5 : x - 2.5
        // z = z > 0 ? z + 2.5 : z - 2.5
        sector.highlightMesh.position.set(highlightPos.x, 0, highlightPos.z);
        if (space.isAvailable(sector.highlightMesh.position))
          sector.highlightMesh.material.color.setHex(0xff0000);
        else sector.highlightMesh.material.color.setHex(0xffffff);
    }
});


let mouseDown = false;
window.addEventListener('mousedown', function () {
    mouseDown = true
});
window.addEventListener('mouseup', function () {
    mouseDown = false
});
const handleMouseDown = () => {
    if (!mouseDown) return
    if (space.isAvailable(sector.highlightMesh.position))
      return;

    if (intersects.length > 0) {
        const pathNode = new PathNode(space, sector.highlightMesh.position);
        
        scene.add(pathNode.object);
        sector.highlightMesh.material.color.setHex(0xFF0000);
    }

}

const animate: XRFrameRequestCallback = (time) => {
//   for (const pos in objects) {
//     const object = objects[pos]
//     object.rotation.x = time / 1000;
//     object.rotation.z = time / 1000;
//     object.position.y = 0.5 + 0.5 * Math.abs(Math.sin(time / 1000));
//   };

  handleMouseDown();
  handleKeyDown();
  renderer.render(scene, orbit.camera);
}

renderer.setAnimationLoop(animate);
