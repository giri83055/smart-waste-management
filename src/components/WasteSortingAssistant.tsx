import { useState, useRef } from 'react';
import { Box, Button, Typography, CircularProgress, Card, CardContent } from '@mui/material';
import { CameraAlt, Refresh } from '@mui/icons-material';
import * as tf from '@tensorflow/tfjs';

interface WasteCategory {
  name: string;
  description: string;
  color: string;
}

const wasteCategories: WasteCategory[] = [
  {
    name: 'Recyclable',
    description: 'Items that can be recycled into new products',
    color: '#4CAF50',
  },
  {
    name: 'Organic',
    description: 'Food waste and biodegradable materials',
    color: '#8D6E63',
  },
  {
    name: 'Hazardous',
    description: 'Dangerous materials requiring special disposal',
    color: '#F44336',
  },
  {
    name: 'Landfill',
    description: 'Non-recyclable waste that goes to landfill',
    color: '#9E9E9E',
  },
];

const WasteSortingAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<WasteCategory | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError('Error accessing camera. Please ensure camera permissions are granted.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        analyzeImage();
      }
    }
  };

  const analyzeImage = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate AI analysis (replace with actual TensorFlow.js model)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result - replace with actual model prediction
      const randomCategory = wasteCategories[Math.floor(Math.random() * wasteCategories.length)];
      setResult(randomCategory);
    } catch (err) {
      setError('Error analyzing image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          AI Waste Sorting Assistant
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Point your camera at the waste item, and we'll help you sort it correctly.
        </Typography>

        <Box sx={{ position: 'relative', mb: 2 }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: '100%', borderRadius: '8px' }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<CameraAlt />}
            onClick={captureImage}
            disabled={isLoading}
          >
            Capture & Analyze
          </Button>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => {
              setResult(null);
              setError(null);
            }}
          >
            Reset
          </Button>
        </Box>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ my: 2 }}>
            {error}
          </Typography>
        )}

        {result && (
          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: `${result.color}20`,
              border: `1px solid ${result.color}`,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {result.name}
            </Typography>
            <Typography variant="body2">
              {result.description}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default WasteSortingAssistant;