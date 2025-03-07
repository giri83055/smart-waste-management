'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface BinLocation {
  id: string
  lat: number
  lng: number
  fillLevel: number
  status: 'normal' | 'warning' | 'critical'
}

const generateMockBins = (): BinLocation[] => {
  return Array.from({ length: 5 }, (_, i) => ({
    id: `bin-${i + 1}`,
    lat: 40.7128 + (Math.random() - 0.5) * 0.01,
    lng: -74.006 + (Math.random() - 0.5) * 0.01,
    fillLevel: Math.random() * 100,
    status: Math.random() > 0.7 ? 'critical' : Math.random() > 0.4 ? 'warning' : 'normal'
  }))
}

const WasteMap = () => {
  const [bins, setBins] = useState<BinLocation[]>([])
  const [selectedBin, setSelectedBin] = useState<BinLocation | null>(null)

  useEffect(() => {
    // Simulate real-time bin data updates
    const interval = setInterval(() => {
      setBins(generateMockBins())
    }, 5000)

    setBins(generateMockBins())
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: BinLocation['status']) => {
    switch (status) {
      case 'critical':
        return 'bg-red-500'
      case 'warning':
        return 'bg-yellow-500'
      default:
        return 'bg-green-500'
    }
  }

  return (
    <div className="glassmorphism rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-4">Waste Bin Map</h3>
      
      {/* Simple Grid Map Visualization */}
      <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
        {bins.map((bin) => (
          <motion.div
            key={bin.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${getStatusColor(
              bin.status
            )}`}
            style={{
              left: `${((bin.lng + 74.006) / 0.01) * 100}%`,
              top: `${((bin.lat - 40.7128) / 0.01) * 100}%`
            }}
            onClick={() => setSelectedBin(bin)}
            whileHover={{ scale: 1.5 }}
          />
        ))}

        {selectedBin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-lg shadow-lg"
          >
            <h4 className="font-semibold">Bin {selectedBin.id}</h4>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div>
                <span className="text-gray-500">Fill Level:</span>
                <span className="ml-2 font-medium">{Math.round(selectedBin.fillLevel)}%</span>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <span className={`ml-2 font-medium capitalize`}>{selectedBin.status}</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedBin(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
          <span>Normal</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
          <span>Warning</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
          <span>Critical</span>
        </div>
      </div>
    </div>
  )
}

export default WasteMap 