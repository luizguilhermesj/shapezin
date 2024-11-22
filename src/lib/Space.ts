import * as THREE from "three";
import type { ShapezObject } from "./ShapezObject";

export class Space {
  public objects: {
    [key: string]: ShapezObject;
  } = {};

  constructor(public scene: THREE.Scene) {
    window.space = this
  }

  add(shapezObject: ShapezObject) {
    const object = shapezObject.object;
    for (let pos of shapezObject.positions) {
      this.objects[pos.toArray().toString()] = shapezObject;
    }
    this.scene.add(object);
  }

  isAvailable(vector: THREE.Vector3) {
    return !!this.getObject(vector);
  }

  getObject(vector: THREE.Vector3) {
    return this.objects[vector.toArray().toString()];
  }
}
