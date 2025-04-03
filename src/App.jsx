import React, { useState, useEffect } from 'react'
import { Box, Container, Typography, AppBar, Toolbar, Paper, Grid } from '@mui/material'
import SearchFood from './components/SearchFood'
import DailySugarIntake from './components/DailySugarIntake'
import SugarHistory from './components/SugarHistory'

const App = () => {
  const [dailySugarIntake, setDailySugarIntake] = useState(0)
  const [sugarHistory, setSugarHistory] = useState([])

  useEffect(() => {
    const savedHistory = localStorage.getItem('sugarHistory')
    if (savedHistory) {
      setSugarHistory(JSON.parse(savedHistory))
    }
  }, [])

  const handleAddSugar = (amount, foodItem) => {
    const newEntry = {
      date: new Date().toISOString(),
      amount,
      foodItem,
    }
    
    setDailySugarIntake(prev => prev + amount)
    setSugarHistory(prev => {
      const updated = [...prev, newEntry]
      localStorage.setItem('sugarHistory', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sugar Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <SearchFood onAddSugar={handleAddSugar} />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <DailySugarIntake amount={dailySugarIntake} />
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <SugarHistory history={sugarHistory} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default App