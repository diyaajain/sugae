import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)