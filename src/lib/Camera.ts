import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class Orbit {
  public camera: THREE.PerspectiveCamera;
  public orbit: OrbitControls;

  private camSpeed;

  constructor(renderer: THREE.Renderer) {
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.orbit = new OrbitControls(this.camera, renderer.domElement);
    this.camera.position.set(0, 10, 0);
    this.orbit.update();

    
    this.camSpeed = {
        x: 0,
        y: 0,
        z: 0,
    };

    window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "a":
        this.camSpeed.x = 1;
        break;
        case "w":
        this.camSpeed.y = -1;
        break;
        case "d":
        this.camSpeed.x = -1;
        break;
        case "s":
        this.camSpeed.y = 1;
        break;
    }
    });
    window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "a":
        this.camSpeed.x = 0;
        break;
        case "w":
        this.camSpeed.y = 0;
        break;
        case "d":
        this.camSpeed.x = 0;
        break;
        case "s":
        this.camSpeed.y = 0;
        break;
    }
    });
  }

  updateCameraPosition() {
    const delta = 0.2;
    // let direction = new THREE.Vector3(camSpeed.x,camSpeed.y,camSpeed.z);

    // const quat = new THREE.Quaternion().setFromEuler(camera.rotation);
    // direction.applyQuaternion(quat)
    // orbit.target = orbit.target.add(direction)
    // camera.position.set(orbit.target.x + 10, orbit.target.y + 10, orbit.target.z + 10)
    // orbit.update();
    var forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);

    /* Extract a vector that is pointing to the right of the camera's current 
       direction. This gives us a vector that we can move left/right (strafe) on,
       relative to the camera's current direction */
    var right = new THREE.Vector3().crossVectors(this.camera.up, forward);

    // Normalize the vectors to unit length for ensure predictable camera movement
    forward.normalize();
    right.normalize();
    if (this.camSpeed.x) {
      this.camera.position.addScaledVector(right, this.camSpeed.x * delta);
      this.orbit.target.addScaledVector(right, this.camSpeed.x * delta);
    }
    if (this.camSpeed.y) {
      const direction = new THREE.Vector3(0, 0, 1);
      const quat = new THREE.Quaternion().setFromEuler(this.camera.rotation);
      direction.applyQuaternion(quat);
      direction.y = 0;
      this.orbit.target.addScaledVector(direction, this.camSpeed.y * delta);
      this.camera.position.addScaledVector(direction, this.camSpeed.y * delta);
    }

    this.orbit.update();
  }
}
