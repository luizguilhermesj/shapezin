import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import type { Space } from "./Space";

let pathNodeModel: THREE.Group;
const mtlLoader = new MTLLoader();
mtlLoader.load("/objects/PathNode.mtl", (materials) => {
  materials.preload();

  const objLoader = new OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.load("/objects/PathNode.obj", (object) => {
    object.scale.set(0.01, 0.01, 0.01);
    pathNodeModel = object.clone();
  });
});

export class PathNode {
  public object: THREE.Group;
  public top?: THREE.Group | THREE.Object3D;
  public bottom?: THREE.Group | THREE.Object3D;
  public right?: THREE.Group | THREE.Object3D;
  public left?: THREE.Group | THREE.Object3D;

  constructor(public space: Space, position: THREE.Vector3) {
    this.object = pathNodeModel.clone();
    this.object.position.copy(position);
    this.object.name = "node";

    let found;
    let temp = position.clone();

    temp.x++;
    found = space.getObject(temp);
    if (found) this.right = found
    temp.x -= 2;
    found = space.getObject(temp);
    if (found) this.left = found;

    temp.x++;
    temp.z++;
    found = space.getObject(temp);
    if (found) this.top = found;
    temp.z -= 2;
    found = space.getObject(temp);
    if (found) this.bottom = found;

    // TODO: FIX TYPE
    // @ts-ignore:next-line
    space.add(this.object);
  }
}

// new THREE.Mesh(
//   new THREE.SphereGeometry(0.4, 32, 32),
//   new THREE.MeshBasicMaterial({
//     wireframe: false,
//     color: 0xffff00,
//   })
// );
