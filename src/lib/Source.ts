import * as THREE from "three";
import { ShapeCircle } from "./ShapeCircle";

export class Source {
  public object: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
  public shapes: ShapeCircle[] = []

  constructor(private scene: THREE.Scene, public position: THREE.Vector3) {
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
    const shape = new ShapeCircle(this.object.position)
    this.shapes.push(shape)
    

    this.scene.add(shape.object)
    
  }
}