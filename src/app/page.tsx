'use client'

import { useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { Box, Container, Tab, Tabs, IconButton, Typography } from '@mui/material'
import {
  Brightness4,
  Brightness7,
  Dashboard,
  Recycling,
  EmojiEvents,
  CameraAlt,
} from '@mui/icons-material'
import { lightTheme, darkTheme } from '@/styles/theme'
import WasteMonitoringDashboard from '@/components/WasteMonitoringDashboard'
import WasteSortingAssistant from '@/components/WasteSortingAssistant'
import WasteGamification from '@/components/WasteGamification'
import ClientWasteMap3D from '@/components/ClientWasteMap3D'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`waste-tabpanel-${index}`}
      aria-labelledby={`waste-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function Home() {
  const [tabValue, setTabValue] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Smart Waste Management
              </Typography>
              <IconButton
                onClick={() => setIsDarkMode(!isDarkMode)}
                color="inherit"
              >
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="waste management tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab
                  icon={<Dashboard />}
                  label="Dashboard"
                  iconPosition="start"
                />
                <Tab
                  icon={<CameraAlt />}
                  label="AI Sorting"
                  iconPosition="start"
                />
                <Tab
                  icon={<Recycling />}
                  label="3D Map"
                  iconPosition="start"
                />
                <Tab
                  icon={<EmojiEvents />}
                  label="Achievements"
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <WasteMonitoringDashboard />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <WasteSortingAssistant />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <ClientWasteMap3D />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <WasteGamification />
            </TabPanel>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
} 