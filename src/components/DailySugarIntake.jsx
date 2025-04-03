import React from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'

const RECOMMENDED_DAILY_SUGAR = 25 // WHO recommends max 25g of sugar per day for adults

const DailySugarIntake = ({ amount }) => {
  const percentage = (amount / RECOMMENDED_DAILY_SUGAR) * 100
  const isOverLimit = amount > RECOMMENDED_DAILY_SUGAR

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Daily Sugar Intake
      </Typography>
      
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress
          variant="determinate"
          value={Math.min(percentage, 100)}
          size={120}
          thickness={4}
          sx={{
            color: isOverLimit ? 'error.main' : 'primary.main',
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            color={isOverLimit ? 'error.main' : 'text.primary'}
          >
            {amount.toFixed(1)}g
          </Typography>
        </Box>
      </Box>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Recommended daily limit: {RECOMMENDED_DAILY_SUGAR}g
      </Typography>
      
      {isOverLimit && (
        <Typography color="error" sx={{ mt: 1 }}>
          Warning: Daily sugar limit exceeded!
        </Typography>
      )}
    </Box>
  )
}

export default DailySugarIntake