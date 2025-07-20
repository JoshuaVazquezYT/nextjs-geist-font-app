import * as THREE from 'three';
import { InputManager } from '@/game/core/InputManager';

export class Character {
  private mesh: THREE.Group;
  private velocity: THREE.Vector3 = new THREE.Vector3();
  private direction: THREE.Vector3 = new THREE.Vector3();
  private speed: number = 5;
  private jumpHeight: number = 8;
  private isGrounded: boolean = false;
  private gravity: number = -20;
  private inputManager: InputManager;

  constructor(scene: THREE.Scene, inputManager: InputManager) {
    this.inputManager = inputManager;
    
    // Create character mesh
    this.mesh = new THREE.Group();
    
    // Body
    const bodyGeometry = new THREE.BoxGeometry(0.8, 1.6, 0.4);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x4169E1 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.8;
    this.mesh.add(body);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.3, 8, 6);
    const headMaterial = new THREE.MeshLambertMaterial({ color: 0xFFDBAC });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.8;
    this.mesh.add(head);
    
    // Arms
    const armGeometry = new THREE.BoxGeometry(0.2, 0.8, 0.2);
    const armMaterial = new THREE.MeshLambertMaterial({ color: 0xFFDBAC });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.6, 1.2, 0);
    this.mesh.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.6, 1.2, 0);
    this.mesh.add(rightArm);
    
    // Legs
    const legGeometry = new THREE.BoxGeometry(0.2, 0.8, 0.2);
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0x4169E1 });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.2, 0.4, 0);
    this.mesh.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.2, 0.4, 0);
    this.mesh.add(rightLeg);
    
    // Add to scene
    scene.add(this.mesh);
    
    // Position character
    this.mesh.position.set(0, 2, 0);
  }

  public update(deltaTime: number) {
    this.handleInput(deltaTime);
    this.applyPhysics(deltaTime);
  }

  private handleInput(deltaTime: number) {
    this.direction.set(0, 0, 0);
    
    // Movement
    if (this.inputManager.isKeyPressed('KeyW')) this.direction.z -= 1;
    if (this.inputManager.isKeyPressed('KeyS')) this.direction.z += 1;
    if (this.inputManager.isKeyPressed('KeyA')) this.direction.x -= 1;
    if (this.inputManager.isKeyPressed('KeyD')) this.direction.x += 1;
    
    this.direction.normalize();
    this.direction.multiplyScalar(this.speed * deltaTime);
    
    // Jump
    if (this.inputManager.isKeyPressed('Space') && this.isGrounded) {
      this.velocity.y = this.jumpHeight;
      this.isGrounded = false;
    }
    
    // Sprint
    if (this.inputManager.isKeyPressed('ShiftLeft') || this.inputManager.isKeyPressed('ShiftRight')) {
      this.direction.multiplyScalar(1.5);
    }
  }

  private applyPhysics(deltaTime: number) {
    // Apply gravity
    this.velocity.y += this.gravity * deltaTime;
    
    // Apply movement
    this.mesh.position.x += this.direction.x;
    this.mesh.position.z += this.direction.z;
    this.mesh.position.y += this.velocity.y * deltaTime;
    
    // Simple ground collision
    if (this.mesh.position.y <= 1) {
      this.mesh.position.y = 1;
      this.velocity.y = 0;
      this.isGrounded = true;
    }
    
    // Prevent falling through world
    if (this.mesh.position.y < -10) {
      this.mesh.position.set(0, 2, 0);
      this.velocity.set(0, 0, 0);
    }
  }

  public getPosition(): THREE.Vector3 {
    return this.mesh.position;
  }

  public getMesh(): THREE.Group {
    return this.mesh;
  }
}
