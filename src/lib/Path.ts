import * as THREE from "three";

export class Path {
  public grid: THREE.GridHelper;
  public planeMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  public highlightMesh: THREE.Mesh<
    THREE.PlaneGeometry,
    THREE.MeshBasicMaterial
  >;

  constructor(size: number = 200) {
    this.grid = new THREE.GridHelper(size, size);
    this.planeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        visible: false,
      })
    );
    this.planeMesh.rotateX(-Math.PI / 2);

    this.highlightMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    this.highlightMesh.rotateX(-Math.PI / 2);
    this.highlightMesh.position.set(0.5, 0, 0.5);
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.grid);
    scene.add(this.planeMesh);
    scene.add(this.highlightMesh);
  }
}
