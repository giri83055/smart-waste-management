'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface WasteData {
  totalCollected: number
  recyclablePercentage: number
  binsNearCapacity: number
  averageFillRate: number
}

const DashboardStats = () => {
  const [data, setData] = useState<WasteData>({
    totalCollected: 0,
    recyclablePercentage: 0,
    binsNearCapacity: 0,
    averageFillRate: 0
  })

  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Waste Collection Trend',
        data: [] as number[],
        fill: true,
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        tension: 0.4
      }
    ]
  })

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const newData = {
        totalCollected: Math.floor(Math.random() * 1000) + 2000,
        recyclablePercentage: Math.floor(Math.random() * 30) + 40,
        binsNearCapacity: Math.floor(Math.random() * 5) + 3,
        averageFillRate: Math.floor(Math.random() * 20) + 70
      }
      setData(newData)

      // Update chart data
      const now = new Date()
      setChartData(prev => ({
        labels: [...prev.labels.slice(-11), now.toLocaleTimeString()].slice(-12),
        datasets: [{
          ...prev.datasets[0],
          data: [...prev.datasets[0].data.slice(-11), newData.totalCollected].slice(-12)
        }]
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glassmorphism p-4 rounded-xl"
        >
          <h3 className="text-sm text-gray-500">Total Collected</h3>
          <p className="text-2xl font-bold text-primary-600">{data.totalCollected}kg</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glassmorphism p-4 rounded-xl"
        >
          <h3 className="text-sm text-gray-500">Recyclable</h3>
          <p className="text-2xl font-bold text-primary-600">{data.recyclablePercentage}%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glassmorphism p-4 rounded-xl"
        >
          <h3 className="text-sm text-gray-500">Bins Near Capacity</h3>
          <p className="text-2xl font-bold text-primary-600">{data.binsNearCapacity}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glassmorphism p-4 rounded-xl"
        >
          <h3 className="text-sm text-gray-500">Average Fill Rate</h3>
          <p className="text-2xl font-bold text-primary-600">{data.averageFillRate}%</p>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glassmorphism p-4 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4">Collection Trend</h3>
        <div className="h-64">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              },
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardStats 