'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder } from '@react-three/drei'
import { Mesh } from 'three'
import { gsap } from 'gsap'
import * as THREE from 'three'

interface WasteBinProps {
  position?: [number, number, number]
  fillLevel?: number
  color?: string
}

const WasteBin: React.FC<WasteBinProps> = ({
  position = [0, 0, 0],
  fillLevel = 0.7,
  color = '#38bdf8'
}) => {
  const binRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (binRef.current) {
      binRef.current.rotation.y += 0.01
    }
  })

  const handleHover = (hovering: boolean) => {
    setHovered(hovering)
    if (binRef.current) {
      gsap.to(binRef.current.scale, {
        x: hovering ? 1.2 : 1,
        y: hovering ? 1.2 : 1,
        z: hovering ? 1.2 : 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  return (
    <group position={position}>
      {/* Bin Body */}
      <mesh
        ref={binRef}
        onPointerOver={() => handleHover(true)}
        onPointerOut={() => handleHover(false)}
      >
        <cylinderGeometry args={[0.5, 0.4, 1.5, 32]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.6}
          roughness={0.2}
          opacity={0.9}
          transparent
        />
      </mesh>

      {/* Waste Level Indicator */}
      <mesh position={[0, fillLevel * 0.7 - 0.75, 0]}>
        <cylinderGeometry args={[0.45, 0.35, fillLevel * 1.4, 32]} />
        <meshPhysicalMaterial
          color={hovered ? '#00ff94' : '#60a5fa'}
          emissive={hovered ? '#00ff94' : '#60a5fa'}
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

const Scene = () => {
  return (
    <group>
      <WasteBin position={[-2, 0, 0]} fillLevel={0.8} color="#38bdf8" />
      <WasteBin position={[0, 0, 0]} fillLevel={0.5} color="#818cf8" />
      <WasteBin position={[2, 0, 0]} fillLevel={0.3} color="#a78bfa" />
    </group>
  )
}

export default Scene