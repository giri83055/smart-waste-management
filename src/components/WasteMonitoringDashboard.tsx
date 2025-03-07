import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Refresh,
  Warning,
  CheckCircle,
  TrendingUp,
  LocationOn,
} from '@mui/icons-material';

interface WasteBin {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
  fillLevel: number;
  status: 'normal' | 'warning' | 'full';
  lastUpdated: string;
}

interface DashboardStats {
  totalBins: number;
  fullBins: number;
  warningBins: number;
  averageFillLevel: number;
}

const WasteMonitoringDashboard = () => {
  const [bins, setBins] = useState<WasteBin[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalBins: 0,
    fullBins: 0,
    warningBins: 0,
    averageFillLevel: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBinData = async () => {
    try {
      // Simulate API call to fetch bin data
      const mockData: WasteBin[] = [
        {
          id: '1',
          location: { lat: 40.7128, lng: -74.0060 },
          fillLevel: 0.85,
          status: 'warning',
          lastUpdated: new Date().toISOString(),
        },
        {
          id: '2',
          location: { lat: 40.7129, lng: -74.0061 },
          fillLevel: 0.95,
          status: 'full',
          lastUpdated: new Date().toISOString(),
        },
        {
          id: '3',
          location: { lat: 40.7130, lng: -74.0062 },
          fillLevel: 0.45,
          status: 'normal',
          lastUpdated: new Date().toISOString(),
        },
      ];

      setBins(mockData);
      
      // Calculate stats
      setStats({
        totalBins: mockData.length,
        fullBins: mockData.filter(bin => bin.status === 'full').length,
        warningBins: mockData.filter(bin => bin.status === 'warning').length,
        averageFillLevel: mockData.reduce((acc, bin) => acc + bin.fillLevel, 0) / mockData.length,
      });
    } catch (err) {
      setError('Error fetching bin data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBinData();
    const interval = setInterval(fetchBinData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, icon, color }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
  }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${color}20`,
              borderRadius: '50%',
              p: 1,
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Waste Monitoring Dashboard</Typography>
        <Tooltip title="Refresh Data">
          <IconButton onClick={fetchBinData}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Bins"
            value={stats.totalBins}
            icon={<LocationOn sx={{ color: '#2196F3' }} />}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Full Bins"
            value={stats.fullBins}
            icon={<Warning sx={{ color: '#F44336' }} />}
            color="#F44336"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Warning Bins"
            value={stats.warningBins}
            icon={<TrendingUp sx={{ color: '#FFC107' }} />}
            color="#FFC107"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Fill Level"
            value={`${Math.round(stats.averageFillLevel * 100)}%`}
            icon={<CheckCircle sx={{ color: '#4CAF50' }} />}
            color="#4CAF50"
          />
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Bin Status Map
          </Typography>
          <Box
            sx={{
              height: 400,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="text.secondary">
              Interactive map will be displayed here
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WasteMonitoringDashboard; 