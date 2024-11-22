import * as THREE from "three";
import { ShapeCircle } from "./ShapeCircle";
import { ShapezObject } from "./ShapezObject";

export class Vortex extends ShapezObject {
  public object: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
  // public edges: THREE.Vector3[];
  public shapes: ShapeCircle[] = [];

  constructor(private scene: THREE.Scene, position: THREE.Vector3) {
    super(position);
    this.object = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        wireframe: false,
        color: 0xff00ff,
      })
    );
    this.object.position.copy(position);
    this.object.name = "vortex";
  }
}
