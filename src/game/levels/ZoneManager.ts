import * as THREE from 'three';

export class ZoneManager {
  private scene: THREE.Scene;
  private zones: { [key: string]: THREE.Group } = {};

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.createZones();
  }

  private createZones() {
    // Create different parkour zones
    this.createRooftopZone();
    this.createConstructionZone();
    this.createCyberZone();
  }

  private createRooftopZone() {
    const zone = new THREE.Group();
    zone.name = 'rooftop';

    // Sunset sky
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF6B35,
      side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    zone.add(sky);

    // Buildings
    for (let i = 0; i < 10; i++) {
      const buildingGeometry = new THREE.BoxGeometry(
        Math.random() * 10 + 5,
        Math.random() * 20 + 10,
        Math.random() * 10 + 5
      );
      const buildingMaterial = new THREE.MeshLambertMaterial({ 
        color: new THREE.Color().setHSL(0.1, 0.3, 0.3 + Math.random() * 0.2) 
      });
      const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
      building.position.set(
        (Math.random() - 0.5) * 100,
        buildingGeometry.parameters.height / 2,
        (Math.random() - 0.5) * 100
      );
      building.castShadow = true;
      building.receiveShadow = true;
      zone.add(building);
    }

    this.zones['rooftop'] = zone;
  }

  private createConstructionZone() {
    const zone = new THREE.Group();
    zone.name = 'construction';

    // Construction site elements
    const craneGeometry = new THREE.BoxGeometry(1, 20, 1);
    const craneMaterial = new THREE.MeshLambertMaterial({ color: 0xFFD700 });
    const crane = new THREE.Mesh(craneGeometry, craneMaterial);
    crane.position.set(0, 10, 0);
    zone.add(crane);

    // Scaffolding
    for (let i = 0; i < 5; i++) {
      const scaffoldGeometry = new THREE.BoxGeometry(8, 0.5, 2);
      const scaffoldMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const scaffold = new THREE.Mesh(scaffoldGeometry, scaffoldMaterial);
      scaffold.position.set(i * 10, i * 3, 0);
      scaffold.castShadow = true;
      scaffold.receiveShadow = true;
      zone.add(scaffold);
    }

    this.zones['construction'] = zone;
  }

  private createCyberZone() {
    const zone = new THREE.Group();
    zone.name = 'cyber';

    // Neon grid floor
    const gridHelper = new THREE.GridHelper(100, 20, 0x00FF00, 0x00FF00);
    zone.add(gridHelper);

    // Floating platforms with neon edges
    for (let i = 0; i < 8; i++) {
      const platformGeometry = new THREE.BoxGeometry(4, 0.5, 4);
      const platformMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x000080,
        transparent: true,
        opacity: 0.8
      });
      const platform = new THREE.Mesh(platformGeometry, platformMaterial);
      platform.position.set(
        (Math.random() - 0.5) * 50,
        Math.random() * 10 + 2,
        (Math.random() - 0.5) * 50
      );
      platform.castShadow = true;
      platform.receiveShadow = true;
      zone.add(platform);

      // Neon edge
      const edgeGeometry = new THREE.EdgesGeometry(platformGeometry);
      const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x00FFFF });
      const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
      platform.add(edges);
    }

    this.zones['cyber'] = zone;
  }

  public loadZone(zoneName: string) {
    // Remove current zones
    Object.values(this.zones).forEach(zone => {
      this.scene.remove(zone);
    });

    // Load requested zone
    const zone = this.zones[zoneName];
    if (zone) {
      this.scene.add(zone);
    }
  }

  public getAvailableZones(): string[] {
    return Object.keys(this.zones);
  }
}
