
import { Box, Container, CssBaseline, Stack, ThemeProvider, createTheme } from '@mui/material'
import './App.css'
import { JobPostingInput } from './components/JobPostingInput'
import { JobHistoryForm } from './components/JobHistoryForm'
import { ResumePreview } from './components/ResumePreview'
import { PersonalInfoForm } from './components/PersonalInfoForm'
import { useResumeStore } from './store/resumeStore'
import { Typography } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2c3e50',
      light: '#34495e',
      dark: '#1a252f',
    },
    secondary: {
      main: '#e74c3c',
      light: '#ff6b6b',
      dark: '#c0392b',
    },
    background: {
      default: '#f5f6fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
})

function App() {
  const { resume, setJobPosting, setWorkExperience } = useResumeStore()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Smart Resume Writer
          </Typography>
          
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            <Box flex={1}>
              <PersonalInfoForm />
              <JobPostingInput onSubmit={setJobPosting} />
              <JobHistoryForm onSubmit={setWorkExperience} />
            </Box>
            <Box flex={1} sx={{ position: { md: 'sticky' }, top: 24 }}>
              <ResumePreview resume={resume} />
            </Box>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
