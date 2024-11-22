import * as THREE from "three";
import { ShapeCircle } from "./ShapeCircle";
import { ShapezObject } from "./ShapezObject";
import type { PathNode } from "./PathNode";

export class Source extends ShapezObject {
  public object: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;

  constructor(private scene: THREE.Scene, position: THREE.Vector3) {
    super(position);
    this.object = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        wireframe: false,
        color: 0x00ffff,
      })
    );
    this.object.position.copy(position);
    this.object.name = "source";


    setInterval(this.generate.bind(this), 3000);
  }

  generate() {
    let path: PathNode;
    for (let edge of this.getEdges()) {
      const check = window.space.getObject(edge);
      if (check) {
        path = check;
        break;
      }
    }

    if (path) {
      const shape = new ShapeCircle(this.object.position);
      path.addShape(shape)
    }
  }
}