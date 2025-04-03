import React from 'react'
import { Box, Typography } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const SugarHistory = ({ history }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`
  }

  const chartData = history.map(entry => ({
    time: formatDate(entry.date),
    sugar: entry.amount,
    name: entry.foodItem
  }))

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Sugar Intake History
      </Typography>
      
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{ value: 'Time', position: 'insideBottomRight', offset: -10 }}
            />
            <YAxis
              label={{
                value: 'Sugar (g)',
                angle: -90,
                position: 'insideLeft',
                offset: 10
              }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Box sx={{ bgcolor: 'background.paper', p: 1, border: 1, borderColor: 'grey.300' }}>
                      <Typography variant="body2">
                        {payload[0].payload.name}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        Sugar: {payload[0].value}g
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Time: {payload[0].payload.time}
                      </Typography>
                    </Box>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="sugar"
              stroke="#2196f3"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}

export default SugarHistory