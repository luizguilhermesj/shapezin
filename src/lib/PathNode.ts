import * as THREE from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import type { Space } from "./Space";
import { ShapezObject } from "./ShapezObject";
import type { ShapeCircle } from "./ShapeCircle";

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

export class PathNode extends ShapezObject {
  public shapes: ShapeCircle[] = [];

  constructor(public space: Space, position: THREE.Vector3) {
    super(position);
    this.object = pathNodeModel.clone();
    this.object.position.copy(position);
    this.object.name = "node";

    let found;
    let temp = position.clone();

    // TODO: FIX TYPE
    // @ts-ignore:next-line
    space.add(this);
  }

  cleanUp() {
    var sphereCalc = new THREE.Sphere( this.object.position, 1 );
    let removed;
    this.shapes = this.shapes.filter((shape) => {
      const exists = sphereCalc.containsPoint(shape.object.position)
      if (!exists) {
        removed = shape
        // this.space.scene.remove(shape.object)
      }
      return exists
    })
    
    if (!removed) return

    for (const edge of this.getEdges()) {
      const nextNode = this.space.getObject(edge) as PathNode;
      // console.log('next', edge, nextNode);
      if (nextNode && nextNode.object.name == "node") {
        nextNode.addShape(removed, false);
      }
    }
  }

  moveShapes(speed: number) {
    for (const shape of this.shapes) {
      shape.move(new THREE.Vector3(speed, 0, 0));
    }
  }

  addShape(shape: ShapeCircle, addToScene: boolean = true) {
    if (this.shapes.length >= 3) return

    this.shapes.push(shape)
    const newPos = this.object.position.clone().add(new THREE.Vector3(-0.2,0.5,0));
    shape.object.position.x = newPos.x
    shape.object.position.y = newPos.y;
    shape.object.position.z = newPos.z;

    if (addToScene) this.space.scene.add(shape.object)
  };
}
