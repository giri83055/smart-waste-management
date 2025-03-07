import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Button,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  EmojiEvents,
  LocalActivity,
  Star,
  TrendingUp,
  Recycling,
} from '@mui/icons-material';

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: React.ReactNode;
  isUnlocked: boolean;
  color: string;
}

interface UserStats {
  level: number;
  points: number;
  nextLevelPoints: number;
  achievements: Achievement[];
}

const achievements: Achievement[] = [
  {
    id: 'recycling_novice',
    title: 'Recycling Novice',
    description: 'Sort 10 items correctly',
    points: 100,
    icon: <Recycling />,
    isUnlocked: false,
    color: '#4CAF50',
  },
  {
    id: 'waste_warrior',
    title: 'Waste Warrior',
    description: 'Report 5 overflowing bins',
    points: 200,
    icon: <TrendingUp />,
    isUnlocked: false,
    color: '#FFC107',
  },
  {
    id: 'eco_master',
    title: 'Eco Master',
    description: 'Maintain 100% sorting accuracy for 1 week',
    points: 500,
    icon: <Star />,
    isUnlocked: false,
    color: '#2196F3',
  },
  {
    id: 'community_champion',
    title: 'Community Champion',
    description: 'Help 5 other users with waste sorting',
    points: 300,
    icon: <LocalActivity />,
    isUnlocked: false,
    color: '#9C27B0',
  },
];

const WasteGamification = () => {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 1,
    points: 0,
    nextLevelPoints: 1000,
    achievements: achievements,
  });

  const calculateProgress = () => {
    return (userStats.points / userStats.nextLevelPoints) * 100;
  };

  const handleAchievementUnlock = (achievementId: string) => {
    setUserStats((prev) => {
      const updatedAchievements = prev.achievements.map((achievement) =>
        achievement.id === achievementId
          ? { ...achievement, isUnlocked: true }
          : achievement
      );

      const achievement = achievements.find((a) => a.id === achievementId);
      const newPoints = prev.points + (achievement?.points || 0);
      const newLevel = Math.floor(newPoints / 1000) + 1;
      const nextLevelPoints = newLevel * 1000;

      return {
        ...prev,
        points: newPoints,
        level: newLevel,
        nextLevelPoints,
        achievements: updatedAchievements,
      };
    });
  };

  return (
    <Card sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <EmojiEvents sx={{ fontSize: 40, color: '#FFD700', mr: 2 }} />
          <Box>
            <Typography variant="h5" gutterBottom>
              Level {userStats.level}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userStats.points} / {userStats.nextLevelPoints} points
            </Typography>
          </Box>
        </Box>

        <LinearProgress
          variant="determinate"
          value={calculateProgress()}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#E0E0E0',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(45deg, #00BCD4, #2196F3)',
            },
          }}
        />

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Achievements
        </Typography>

        <Grid container spacing={2}>
          {userStats.achievements.map((achievement) => (
            <Grid item xs={12} sm={6} key={achievement.id}>
              <Card
                sx={{
                  bgcolor: achievement.isUnlocked ? `${achievement.color}20` : '#f5f5f5',
                  border: `1px solid ${
                    achievement.isUnlocked ? achievement.color : '#e0e0e0'
                  }`,
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <IconButton
                      sx={{
                        color: achievement.isUnlocked ? achievement.color : '#9e9e9e',
                        mr: 1,
                      }}
                    >
                      {achievement.icon}
                    </IconButton>
                    <Typography variant="subtitle1">
                      {achievement.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {achievement.description}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {achievement.points} points
                  </Typography>
                  {!achievement.isUnlocked && (
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => handleAchievementUnlock(achievement.id)}
                    >
                      Unlock
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WasteGamification; 