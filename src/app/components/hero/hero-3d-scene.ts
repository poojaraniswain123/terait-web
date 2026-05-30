import * as THREE from 'three';

export interface SceneConfig {
  container: HTMLElement;
  onReady?: () => void;
}

export class Hero3DScene {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private container: HTMLElement;
  private animationId: number = 0;
  private clock = new THREE.Clock();
  
  // Globe and particles
  private globe!: THREE.Group;
  private globeMesh!: THREE.Mesh;
  private globeWireframe!: THREE.LineSegments;
  private particles!: THREE.Points;
  private dataStreams: THREE.Line[] = [];
  private floatingElements: THREE.Group[] = [];
  private neuralNetwork!: THREE.Group;
  private cloudNodes: THREE.Group[] = [];
  private energyRings: THREE.Mesh[] = [];
  
  // Mouse interaction
  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;
  
  // Colors - Terait brand palette
  private readonly colors = {
    primaryBlue: new THREE.Color(0x0066cc),
    deepBlue: new THREE.Color(0x001a33),
    premiumRed: new THREE.Color(0xe53e3e),
    electricCyan: new THREE.Color(0x00d4ff),
    white: new THREE.Color(0xffffff),
    silver: new THREE.Color(0xc0c0c0)
  };

  constructor(config: SceneConfig) {
    this.container = config.container;
    this.init();
    this.createScene();
    this.animate();
    this.addEventListeners();
    config.onReady?.();
  }

  private init(): void {
    // Scene
    this.scene = new THREE.Scene();
    
    // Camera
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
    this.camera.position.z = 8;
    this.camera.position.y = 0.5;
    
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);
    
    // Lighting
    this.setupLighting();
  }

  private setupLighting(): void {
    // Ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);
    
    // Main directional light
    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 5, 5);
    this.scene.add(mainLight);
    
    // Blue accent light
    const blueLight = new THREE.PointLight(0x0066cc, 2, 20);
    blueLight.position.set(-5, 2, 3);
    this.scene.add(blueLight);
    
    // Red accent light (Terait brand)
    const redLight = new THREE.PointLight(0xe53e3e, 1.5, 15);
    redLight.position.set(5, -2, 3);
    this.scene.add(redLight);
    
    // Cyan rim light
    const cyanLight = new THREE.PointLight(0x00d4ff, 1, 18);
    cyanLight.position.set(0, 5, -3);
    this.scene.add(cyanLight);
  }

  private createScene(): void {
    this.createGlobe();
    this.createParticleField();
    this.createDataStreams();
    this.createNeuralNetwork();
    this.createFloatingElements();
    this.createCloudNodes();
    this.createEnergyRings();
  }

  private createGlobe(): void {
    this.globe = new THREE.Group();
    
    // Main globe sphere with holographic material
    const globeGeometry = new THREE.SphereGeometry(2, 64, 64);
    const globeMaterial = new THREE.MeshPhysicalMaterial({
      color: this.colors.primaryBlue,
      transparent: true,
      opacity: 0.15,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide
    });
    this.globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    this.globe.add(this.globeMesh);
    
    // Wireframe overlay
    const wireframeGeometry = new THREE.IcosahedronGeometry(2.02, 3);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: this.colors.electricCyan,
      transparent: true,
      opacity: 0.4
    });
    const wireframeEdges = new THREE.EdgesGeometry(wireframeGeometry);
    this.globeWireframe = new THREE.LineSegments(wireframeEdges, wireframeMaterial);
    this.globe.add(this.globeWireframe);
    
    // Inner glow sphere
    const innerGlowGeometry = new THREE.SphereGeometry(1.9, 32, 32);
    const innerGlowMaterial = new THREE.MeshBasicMaterial({
      color: this.colors.premiumRed,
      transparent: true,
      opacity: 0.05,
      side: THREE.BackSide
    });
    const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
    this.globe.add(innerGlow);
    
    // Globe grid lines
    this.createGlobeGridLines();
    
    // Data points on globe surface
    this.createGlobeDataPoints();
    
    this.scene.add(this.globe);
  }

  private createGlobeGridLines(): void {
    const lineMaterial = new THREE.LineBasicMaterial({
      color: this.colors.electricCyan,
      transparent: true,
      opacity: 0.3
    });
    
    // Latitude lines
    for (let i = -60; i <= 60; i += 30) {
      const lat = (i * Math.PI) / 180;
      const radius = 2.01 * Math.cos(lat);
      const y = 2.01 * Math.sin(lat);
      
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 360; j += 5) {
        const lon = (j * Math.PI) / 180;
        points.push(new THREE.Vector3(
          radius * Math.cos(lon),
          y,
          radius * Math.sin(lon)
        ));
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      this.globe.add(line);
    }
    
    // Longitude lines
    for (let i = 0; i < 360; i += 30) {
      const lon = (i * Math.PI) / 180;
      const points: THREE.Vector3[] = [];
      
      for (let j = -90; j <= 90; j += 5) {
        const lat = (j * Math.PI) / 180;
        points.push(new THREE.Vector3(
          2.01 * Math.cos(lat) * Math.cos(lon),
          2.01 * Math.sin(lat),
          2.01 * Math.cos(lat) * Math.sin(lon)
        ));
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, lineMaterial);
      this.globe.add(line);
    }
  }

  private createGlobeDataPoints(): void {
    const pointCount = 200;
    const positions: number[] = [];
    const colors: number[] = [];
    
    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const radius = 2.03;
      
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
      
      // Alternate between cyan and red
      const color = Math.random() > 0.7 ? this.colors.premiumRed : this.colors.electricCyan;
      colors.push(color.r, color.g, color.b);
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    
    const points = new THREE.Points(geometry, material);
    this.globe.add(points);
  }

  private createParticleField(): void {
    const particleCount = 3000;
    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in a sphere around the scene
      const radius = 3 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      
      // Color variety
      const colorChoice = Math.random();
      let color: THREE.Color;
      if (colorChoice < 0.4) {
        color = this.colors.electricCyan;
      } else if (colorChoice < 0.7) {
        color = this.colors.primaryBlue;
      } else if (colorChoice < 0.85) {
        color = this.colors.premiumRed;
      } else {
        color = this.colors.white;
      }
      colors.push(color.r, color.g, color.b);
      
      sizes.push(Math.random() * 0.03 + 0.01);
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    
    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });
    
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private createDataStreams(): void {
    const streamCount = 15;
    
    for (let i = 0; i < streamCount; i++) {
      const points: THREE.Vector3[] = [];
      const startAngle = (i / streamCount) * Math.PI * 2;
      const startRadius = 2.5 + Math.random();
      const endRadius = 5 + Math.random() * 3;
      
      const startY = (Math.random() - 0.5) * 2;
      const endY = (Math.random() - 0.5) * 4;
      
      const segments = 30;
      for (let j = 0; j <= segments; j++) {
        const t = j / segments;
        const radius = startRadius + (endRadius - startRadius) * t;
        const angle = startAngle + t * Math.PI * 0.5;
        const y = startY + (endY - startY) * t + Math.sin(t * Math.PI * 2) * 0.3;
        
        points.push(new THREE.Vector3(
          radius * Math.cos(angle),
          y,
          radius * Math.sin(angle)
        ));
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const color = Math.random() > 0.5 ? this.colors.electricCyan : this.colors.premiumRed;
      const material = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4
      });
      
      const line = new THREE.Line(geometry, material);
      this.dataStreams.push(line);
      this.scene.add(line);
    }
  }

  private createNeuralNetwork(): void {
    this.neuralNetwork = new THREE.Group();
    
    // Create nodes
    const nodeCount = 40;
    const nodes: THREE.Vector3[] = [];
    const nodeMeshes: THREE.Mesh[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      const y = (Math.random() - 0.5) * 3;
      
      const position = new THREE.Vector3(
        radius * Math.cos(angle),
        y,
        radius * Math.sin(angle)
      );
      nodes.push(position);
      
      const nodeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.6 ? this.colors.premiumRed : this.colors.electricCyan,
        transparent: true,
        opacity: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      nodeMesh.position.copy(position);
      nodeMeshes.push(nodeMesh);
      this.neuralNetwork.add(nodeMesh);
    }
    
    // Create connections
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: this.colors.primaryBlue,
      transparent: true,
      opacity: 0.2
    });
    
    for (let i = 0; i < nodeCount; i++) {
      const connectCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < connectCount; j++) {
        const targetIndex = Math.floor(Math.random() * nodeCount);
        if (targetIndex !== i) {
          const points = [nodes[i], nodes[targetIndex]];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, connectionMaterial);
          this.neuralNetwork.add(line);
        }
      }
    }
    
    this.scene.add(this.neuralNetwork);
  }

  private createFloatingElements(): void {
    const elements = [
      { type: 'cube', count: 8 },
      { type: 'octahedron', count: 5 },
      { type: 'tetrahedron', count: 4 }
    ];
    
    elements.forEach(config => {
      for (let i = 0; i < config.count; i++) {
        const group = new THREE.Group();
        
        let geometry: THREE.BufferGeometry;
        switch (config.type) {
          case 'cube':
            geometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
            break;
          case 'octahedron':
            geometry = new THREE.OctahedronGeometry(0.12);
            break;
          case 'tetrahedron':
            geometry = new THREE.TetrahedronGeometry(0.1);
            break;
          default:
            geometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);
        }
        
        // Glass-like material
        const material = new THREE.MeshPhysicalMaterial({
          color: Math.random() > 0.5 ? this.colors.primaryBlue : this.colors.silver,
          transparent: true,
          opacity: 0.6,
          roughness: 0.1,
          metalness: 0.8,
          clearcoat: 1.0
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
        
        // Wireframe outline
        const wireframe = new THREE.LineSegments(
          new THREE.EdgesGeometry(geometry),
          new THREE.LineBasicMaterial({ 
            color: this.colors.electricCyan,
            transparent: true,
            opacity: 0.5
          })
        );
        group.add(wireframe);
        
        // Position randomly around the scene
        const angle = Math.random() * Math.PI * 2;
        const radius = 4 + Math.random() * 4;
        const y = (Math.random() - 0.5) * 5;
        
        group.position.set(
          radius * Math.cos(angle),
          y,
          radius * Math.sin(angle)
        );
        
        // Store animation data
        (group as any).floatSpeed = 0.3 + Math.random() * 0.4;
        (group as any).floatOffset = Math.random() * Math.PI * 2;
        (group as any).rotationSpeed = {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02
        };
        
        this.floatingElements.push(group);
        this.scene.add(group);
      }
    });
  }

  private createCloudNodes(): void {
    const nodeCount = 12;
    
    for (let i = 0; i < nodeCount; i++) {
      const group = new THREE.Group();
      
      // Cloud node - hexagonal shape
      const hexGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 6);
      const hexMaterial = new THREE.MeshPhysicalMaterial({
        color: this.colors.primaryBlue,
        transparent: true,
        opacity: 0.4,
        roughness: 0.2,
        metalness: 0.9
      });
      const hexMesh = new THREE.Mesh(hexGeometry, hexMaterial);
      hexMesh.rotation.x = Math.PI / 2;
      group.add(hexMesh);
      
      // Glow ring
      const ringGeometry = new THREE.RingGeometry(0.18, 0.22, 6);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: this.colors.electricCyan,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      group.add(ring);
      
      // Position
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 5 + Math.random() * 2;
      const y = (Math.random() - 0.5) * 4;
      
      group.position.set(
        radius * Math.cos(angle),
        y,
        radius * Math.sin(angle)
      );
      
      (group as any).floatOffset = Math.random() * Math.PI * 2;
      (group as any).pulseOffset = Math.random() * Math.PI * 2;
      
      this.cloudNodes.push(group);
      this.scene.add(group);
    }
  }

  private createEnergyRings(): void {
    const ringCount = 3;
    
    for (let i = 0; i < ringCount; i++) {
      const innerRadius = 2.2 + i * 0.8;
      const outerRadius = innerRadius + 0.02;
      
      const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
      const material = new THREE.MeshBasicMaterial({
        color: i === 1 ? this.colors.premiumRed : this.colors.electricCyan,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2 + (i * 0.2);
      ring.rotation.z = i * 0.3;
      
      (ring as any).rotationSpeed = 0.1 + i * 0.05;
      (ring as any).pulseOffset = i * Math.PI / 3;
      
      this.energyRings.push(ring);
      this.scene.add(ring);
    }
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);
    
    const time = this.clock.getElapsedTime();
    const delta = this.clock.getDelta();
    
    // Smooth mouse follow
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
    
    // Globe rotation
    if (this.globe) {
      this.globe.rotation.y += 0.002;
      this.globe.rotation.x = this.mouseY * 0.1;
      this.globe.position.x = this.mouseX * 0.2;
    }
    
    // Wireframe pulse
    if (this.globeWireframe) {
      const wireframeMaterial = this.globeWireframe.material as THREE.LineBasicMaterial;
      wireframeMaterial.opacity = 0.3 + Math.sin(time * 2) * 0.15;
    }
    
    // Particle field rotation
    if (this.particles) {
      this.particles.rotation.y += 0.0003;
      this.particles.rotation.x = this.mouseY * 0.05;
    }
    
    // Data streams animation
    this.dataStreams.forEach((stream, i) => {
      const material = stream.material as THREE.LineBasicMaterial;
      material.opacity = 0.3 + Math.sin(time * 2 + i * 0.5) * 0.2;
      stream.rotation.y += 0.001;
    });
    
    // Neural network
    if (this.neuralNetwork) {
      this.neuralNetwork.rotation.y += 0.001;
      this.neuralNetwork.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh) {
          const scale = 1 + Math.sin(time * 3 + i * 0.3) * 0.3;
          child.scale.setScalar(scale);
        }
      });
    }
    
    // Floating elements animation
    this.floatingElements.forEach(element => {
      const data = element as any;
      element.position.y += Math.sin(time * data.floatSpeed + data.floatOffset) * 0.002;
      element.rotation.x += data.rotationSpeed.x;
      element.rotation.y += data.rotationSpeed.y;
      element.rotation.z += data.rotationSpeed.z;
    });
    
    // Cloud nodes animation
    this.cloudNodes.forEach(node => {
      const data = node as any;
      node.position.y += Math.sin(time * 0.5 + data.floatOffset) * 0.002;
      node.rotation.z = Math.sin(time * 0.3 + data.pulseOffset) * 0.1;
      
      // Pulse glow
      node.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.RingGeometry) {
          const material = child.material as THREE.MeshBasicMaterial;
          material.opacity = 0.2 + Math.sin(time * 2 + data.pulseOffset) * 0.15;
        }
      });
    });
    
    // Energy rings animation
    this.energyRings.forEach(ring => {
      const data = ring as any;
      ring.rotation.z += data.rotationSpeed * 0.01;
      const material = ring.material as THREE.MeshBasicMaterial;
      material.opacity = 0.2 + Math.sin(time * 1.5 + data.pulseOffset) * 0.15;
    });
    
    // Camera parallax
    this.camera.position.x = this.mouseX * 0.5;
    this.camera.position.y = 0.5 + this.mouseY * 0.3;
    this.camera.lookAt(0, 0, 0);
    
    this.renderer.render(this.scene, this.camera);
  };

  private addEventListeners(): void {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('mousemove', this.handleMouseMove);
  }

  private handleResize = (): void => {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private handleMouseMove = (event: MouseEvent): void => {
    this.targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
    this.targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  public dispose(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    
    // Dispose geometries and materials
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach(m => m.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
    
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
