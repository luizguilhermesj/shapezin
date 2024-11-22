import * as THREE from "three";
export abstract class ShapezObject {
  public object: THREE.Object3D;
  public positions: THREE.Vector3[] = [];
  private edges: THREE.Vector3[] = [];

  constructor(public position: THREE.Vector3) {
    this.setPositions(position);
    this.object = new THREE.Mesh();
  }

  private setPositions(position: THREE.Vector3) {
    if (Math.abs(position.x % 1) == 0.5 && Math.abs(position.z % 1) == 0.5) {
      console.log(position)
      this.positions = [position];
    } else {
      this.positions = [
        new THREE.Vector3(
          this.nearest(position.x + 1),
          position.y,
          this.nearest(position.z + 1)
        ),
        new THREE.Vector3(
          this.nearest(position.x),
          position.y,
          this.nearest(position.z)
        ),
        new THREE.Vector3(
          this.nearest(position.x),
          position.y,
          this.nearest(position.z + 1)
        ),
        new THREE.Vector3(
          this.nearest(position.x + 1),
          position.y,
          this.nearest(position.z)
        ),
      ];
    }
  }
  protected nearest(n: number) {
    let x = ((1 - (n % 1)) % 1) + n;
    return n % 1 > 0.5 ? x + 0.5 : x - 0.5;
  }

  public getEdges() {
    if (this.edges.length > 0) return this.edges
    
    const hash: {[key: string]: boolean} = {}
    for (let point of this.positions) {
        hash[point.x.toString() + '-' + point.z.toString()] = true
    }
    for (let point of this.positions) {
        const clone = point.clone()
        if (!hash[(clone.x + 1).toString() + '-' + clone.z.toString()]) {
            this.edges.push(clone.clone().setComponent(0, clone.x + 1))
        }

        if (!hash[(clone.x).toString() + '-' + (clone.z + 1).toString()]) {
            this.edges.push(clone.clone().setComponent(2, clone.z + 1))
        }

        if (!hash[(clone.x - 1).toString() + "-" + clone.z.toString()]) {
          this.edges.push(clone.clone().setComponent(0, clone.x - 1));
        }

        if (!hash[clone.x.toString() + "-" + (clone.z - 1).toString()]) {
          this.edges.push(clone.clone().setComponent(2, clone.z - 1));
          
        }
    }

    return this.edges
  }

  
}

// const size = new THREE.Vector3();
// const size2 = new THREE.Box3().setFromObject(this.object).getSize(size);
// console.log(
//   this.object.name,
//   this.object.position,
//   size,
//   size2,
//   this.object.position.clone().addScaledVector(size, 1)
// );
