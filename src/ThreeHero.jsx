import { useEffect, useRef } from "react";
import * as THREE from "three";

function createParticleField(count) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const radius = 3.5 + Math.random() * 6.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  return geometry;
}

export default function ThreeHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.set(0, 0, 8);

    const pointer = new THREE.Vector2(0, 0);
    const group = new THREE.Group();
    scene.add(group);

    const coreGeometry = new THREE.IcosahedronGeometry(1.55, 3);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x33d7ba,
      emissive: 0x082822,
      metalness: 0.42,
      roughness: 0.22,
      clearcoat: 1,
      transparent: true,
      opacity: 0.84,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const wire = new THREE.Mesh(
      coreGeometry,
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.16,
        wireframe: true,
      }),
    );
    wire.scale.setScalar(1.04);
    group.add(wire);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xf0a85b,
      transparent: true,
      opacity: 0.56,
    });

    const rings = [2.25, 2.75, 3.25].map((radius, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 12, 160), ringMaterial);
      ring.rotation.x = Math.PI / 2 + index * 0.28;
      ring.rotation.y = index * 0.42;
      group.add(ring);
      return ring;
    });

    const particles = new THREE.Points(
      createParticleField(850),
      new THREE.PointsMaterial({
        color: 0x9cf5ff,
        size: 0.022,
        transparent: true,
        opacity: 0.74,
        depthWrite: false,
      }),
    );
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0x7dded2, 0.9));

    const keyLight = new THREE.PointLight(0xffffff, 2.4, 24);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const accentLight = new THREE.PointLight(0xffa85a, 1.8, 18);
    accentLight.position.set(-4, -3, 4);
    scene.add(accentLight);

    const handleResize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth || window.innerWidth;
      const height = parent?.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const handlePointerMove = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      group.rotation.x += (pointer.y * 0.18 - group.rotation.x) * 0.035;
      group.rotation.y += (pointer.x * 0.28 - group.rotation.y) * 0.035;
      core.rotation.y = elapsed * 0.33;
      core.rotation.z = elapsed * 0.18;
      wire.rotation.y = -elapsed * 0.22;
      particles.rotation.y = elapsed * 0.018;
      particles.rotation.x = Math.sin(elapsed * 0.15) * 0.06;

      rings.forEach((ring, index) => {
        ring.rotation.z = elapsed * (0.16 + index * 0.055);
      });

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    handleResize();
    animate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      coreGeometry.dispose();
      coreMaterial.dispose();
      wire.material.dispose();
      rings.forEach((ring) => ring.geometry.dispose());
      ringMaterial.dispose();
      particles.geometry.dispose();
      particles.material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="three-canvas" aria-hidden="true" />;
}
