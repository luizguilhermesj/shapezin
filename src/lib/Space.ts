import * as THREE from "three";

export class Space {
  public objects: {
    [key: string]: THREE.Object3D | THREE.Group;
  } = {};

  constructor(private scene: THREE.Scene) {}

  add(object: THREE.Mesh) {
    if (
      Math.abs(object.position.x % 1) == 0.5 &&
      Math.abs(object.position.z % 1) == 0.5
    ) {
      this.objects[object.position.toArray().toString()] = object;
    } else {
      if (
        Math.abs(object.position.x % 1) != 0.5 &&
        Math.abs(object.position.z % 1) != 0.5
      ) {
        let temp = new THREE.Vector3();
        temp.copy(object.position);
        temp.x = this.nearest(temp.x);
        temp.z = this.nearest(temp.z);
        this.objects[temp.toArray().toString()] = object;
        temp.x++;
        this.objects[temp.toArray().toString()] = object;
        temp.z++;
        this.objects[temp.toArray().toString()] = object;
        temp.x--;
        this.objects[temp.toArray().toString()] = object;
      }
      //   if (false) {
      //     let temp = new THREE.Vector3();
      //     temp.copy(object.position);
      //     temp.z = this.nearest(temp.z);
      //     console.log(temp.z);
      //     this.objects[temp.toArray().toString()] = object;
      //     temp.z++;
      //     console.log(temp.z);
      //     this.objects[temp.toArray().toString()] = object;
      //   }
    }
    this.scene.add(object);
  }

  isAvailable(vector: THREE.Vector3) {
    return !!this.getObject(vector);
  }

  getObject(vector: THREE.Vector3) {
    return this.objects[vector.toArray().toString()];
  }

  private nearest(n: number) {
    let x = ((1 - (n % 1)) % 1) + n;
    return n % 1 > 0.5 ? x + 0.5 : x - 0.5;
  }
}
