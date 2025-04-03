import React, { useState } from 'react'
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material'
import axios from 'axios'

const NUTRITIONIX_APP_ID = import.meta.env.VITE_NUTRITIONIX_APP_ID
const NUTRITIONIX_APP_KEY = import.meta.env.VITE_NUTRITIONIX_APP_KEY

const SearchFood = ({ onAddSugar }) => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [error, setError] = useState('')

  const searchFood = async () => {
    if (!query.trim()) return

    setLoading(true)
    setError('')
    try {
      const response = await axios.get('https://trackapi.nutritionix.com/v2/search/instant', {
        params: { query },
        headers: {
          'x-app-id': NUTRITIONIX_APP_ID,
          'x-app-key': NUTRITIONIX_APP_KEY,
        },
      })

      const items = response.data.common.slice(0, 5)
      const detailedResults = await Promise.all(
        items.map(item =>
          axios.post(
            'https://trackapi.nutritionix.com/v2/natural/nutrients',
            { query: item.food_name },
            {
              headers: {
                'x-app-id': NUTRITIONIX_APP_ID,
                'x-app-key': NUTRITIONIX_APP_KEY,
              },
            }
          )
        )
      )

      const processedResults = detailedResults.map((result, index) => ({
        name: items[index].food_name,
        sugarContent: result.data.foods[0].nf_sugars || 0,
        servingSize: result.data.foods[0].serving_qty,
        servingUnit: result.data.foods[0].serving_unit,
      }))

      setResults(processedResults)
    } catch (err) {
      if (!NUTRITIONIX_APP_ID || !NUTRITIONIX_APP_KEY) {
        setError('API credentials are not configured. Please check your environment variables.')
      } else {
        setError('Failed to fetch food data. Please try again.')
      }
      console.error('Error fetching food data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddFood = (food) => {
    onAddSugar(food.sugarContent, food.name)
    setResults([])
    setQuery('')
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Search Food
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter food item..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchFood()}
        />
        <Button
          variant="contained"
          onClick={searchFood}
          disabled={loading}
        >
          Search
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {results.length > 0 && (
        <List>
          {results.map((food, index) => (
            <ListItem
              key={index}
              button
              onClick={() => handleAddFood(food)}
              sx={{ border: 1, borderColor: 'divider', mb: 1, borderRadius: 1 }}
            >
              <ListItemText
                primary={food.name}
                secondary={`Sugar: ${food.sugarContent}g per ${food.servingSize} ${food.servingUnit}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  )
}

export default SearchFood