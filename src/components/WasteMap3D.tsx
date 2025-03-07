'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Text } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { Box as MuiBox, Typography } from '@mui/material';

interface WasteBin {
  id: string;
  position: [number, number, number];
  fillLevel: number;
  status: 'normal' | 'warning' | 'full';
}

const WasteMap3D = () => {
  const [bins, setBins] = useState<WasteBin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call to fetch bin data
    const fetchBinData = async () => {
      try {
        // Replace with actual API call
        const mockData: WasteBin[] = [
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
        setBins(mockData);
      } catch (error) {
        console.error('Error fetching bin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBinData();
    const interval = setInterval(fetchBinData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

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

  if (loading) {
    return (
      <MuiBox display="flex" justifyContent="center" alignItems="center" height="400px">
        <Typography>Loading 3D Map...</Typography>
      </MuiBox>
    );
  }

  return (
    <MuiBox height="400px" width="100%" position="relative">
      <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>

        {/* Waste bins */}
        {bins.map((bin) => (
          <group key={bin.id} position={bin.position}>
            <Box args={[1, 2, 1]}>
              <meshStandardMaterial color={getBinColor(bin.status)} />
            </Box>
            <Text
              position={[0, 1.5, 0]}
              fontSize={0.3}
              color="black"
              anchorX="center"
              anchorY="middle"
            >
              {`${Math.round(bin.fillLevel * 100)}%`}
            </Text>
          </group>
        ))}

        <OrbitControls />
      </Canvas>
    </MuiBox>
  );
};

export default WasteMap3D; 