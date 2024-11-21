import * as THREE from "three";

export class Source {
  public object: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
  constructor(position: THREE.Vector3) {
    this.object = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        wireframe: false,
        color: 0x00ffff,
      })
    );

    this.object.position.copy(position);
    this.object.name = "source";
  }
}