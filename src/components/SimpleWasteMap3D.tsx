'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Box as MuiBox, Typography } from '@mui/material';

interface WasteBin {
  id: string;
  position: [number, number, number];
  fillLevel: number;
  status: 'normal' | 'warning' | 'full';
}

const SimpleWasteMap3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const binsRef = useRef<THREE.Group[]>([]);

  const getBinColor = (status: WasteBin['status']) => {
    switch (status) {
      case 'normal':
        return '#4CAF50';
      case 'warning':
        return '#FFC107';
      case 'full':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: '#f0f0f0' });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    scene.add(ground);

    // Mock data
    const mockBins: WasteBin[] = [
      {
        id: '1',
        position: [-2, 0, -2],
        fillLevel: 0.7,
        status: 'warning',
      },
      {
        id: '2',
        position: [2, 0, 2],
        fillLevel: 0.3,
        status: 'normal',
      },
      {
        id: '3',
        position: [0, 0, 0],
        fillLevel: 0.9,
        status: 'full',
      },
    ];

    // Create bins
    mockBins.forEach((bin) => {
      const binGeometry = new THREE.BoxGeometry(1, 2, 1);
      const binMaterial = new THREE.MeshStandardMaterial({ color: getBinColor(bin.status) });
      const binMesh = new THREE.Mesh(binGeometry, binMaterial);
      binMesh.position.set(...bin.position);
      scene.add(binMesh);
      binsRef.current.push(binMesh);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MuiBox height="400px" width="100%" position="relative">
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </MuiBox>
  );
};

export default SimpleWasteMap3D; 