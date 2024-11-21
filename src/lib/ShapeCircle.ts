
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

export class ShapeCircle {
  public object: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;

  constructor(position: THREE.Vector3) {
    this.object = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 32, 32),
      new THREE.MeshBasicMaterial({
        wireframe: false,
        color: 0xffff00,
      })
    );

    this.object.position.copy(position);
    this.object.position.y = 1;
    this.object.name = "shape";

  }

  move(direction: THREE.Vector3) {
    this.object.position.addScaledVector(direction, 1)
  }
}
