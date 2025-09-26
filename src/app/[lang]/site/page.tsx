'use client'

import { Grid, useMediaQuery } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { Header } from 'src/components/Header'
import { Task } from 'src/infrastructure/@types/tasks'
import { useGetSWR } from 'src/infrastructure/hooks'
import { useAuth } from 'src/infrastructure/providers'
import { Chat } from './components/Chat'
import { ManagerTasks } from './components/ManagerTasks'
import { ModalAuth } from './components/ModalAuth'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4aa',
    },
    secondary: {
      main: '#8b5cf6',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
})

export default function TaskChat() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [authTab, setAuthTab] = useState(0)
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('Todas as prioridades')
  const [currentPage, setCurrentPage] = useState(1)

  const { user } = useAuth()
  const token = getCookie('token')

  const { data: tasks, mutate } = useGetSWR<Task[]>(
    '/tasks',
    { params: { search, limit: 20 } },
    Boolean(user && token),
  )

  useEffect(() => {
    mutate()
  }, [search, mutate])

  useEffect(() => {
    if (user && token) {
      setIsLoggedIn(true)
      return
    }

    setIsLoggedIn(false)
  }, [user, token])

  const isDesktop = useMediaQuery('(min-width:920px)')

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Header setModalOpen={setModalOpen} />

      <Grid
        mt={2}
        display="flex"
        flexDirection={isDesktop ? 'row' : 'column'}
        justifyContent="space-evenly"
      >
        <ManagerTasks
          tasks={tasks}
          isLoggedIn={isLoggedIn}
          search={search}
          priorityFilter={priorityFilter}
          currentPage={currentPage}
          setSearch={setSearch}
          setPriorityFilter={setPriorityFilter}
          setCurrentPage={setCurrentPage}
        />

        <Chat isLoggedIn={isLoggedIn} />
      </Grid>

      <ModalAuth
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        authTab={authTab}
        setAuthTab={setAuthTab}
        setIsLoggedIn={setIsLoggedIn}
      />
    </ThemeProvider>
  )
}
