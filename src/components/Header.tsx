import { Chat as ChatIcon, Person } from '@mui/icons-material'
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from '@mui/material'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { styles } from 'src/app/[lang]/site/styles'
import { useAuth } from 'src/infrastructure/providers'
import { User } from 'src/infrastructure/providers/zustand/types'

interface Props {
  setModalOpen: (x: boolean) => void
}

export function Header({ setModalOpen }: Props) {
  const [userCur, setUserCur] = useState<User | undefined>()

  const { user, logout } = useAuth()
  const token = getCookie('token')

  useEffect(() => {
    if (user && token) {
      setUserCur(user)
      return
    }
    setUserCur(undefined)
  }, [user, token])

  return (
    <AppBar position="static" sx={styles.appBar}>
      <Toolbar>
        <Box sx={styles.logo}>
          <Avatar sx={styles.logoIcon}>
            <ChatIcon />
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 'bold' }}
            >
              Task Manager AI
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Gerencie tarefas IA
            </Typography>
          </Box>
        </Box>
        {userCur ? (
          <Box>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              {userCur.name}
            </Typography>
            <Button variant="text" onClick={logout}>
              Sair
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            sx={styles.loginButton}
            onClick={() => setModalOpen(true)}
            startIcon={<Person />}
            size="small"
          >
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
