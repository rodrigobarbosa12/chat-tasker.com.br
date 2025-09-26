'use client'

import { Email } from '@mui/icons-material'
import {
  Box,
  Button,
  InputAdornment,
  Modal,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { setCookie } from 'cookies-next'
import { useFormik } from 'formik'
import { useState } from 'react'
import { api } from 'src/adapters'
import { Input } from 'src/components/form/Input'
import { Signin, Signup } from 'src/infrastructure/@types/auth'
import { usePostSWR } from 'src/infrastructure/hooks'
import { useAuth } from 'src/infrastructure/providers'
import { User } from 'src/infrastructure/providers/zustand/types'
import { TabPanel } from './TabPanel'
import { validarFormSignin, validarFormSignup } from './validar-erro-form'

interface Props {
  modalOpen: boolean
  authTab: number
  setModalOpen: (x: boolean) => void
  setAuthTab: (x: number) => void
  setIsLoggedIn: (x: boolean) => void
}

interface Params {
  email: string
  password: string
}

interface Result {
  token: string
  refreshtoken: string
  user: User
}

export function ModalAuth({
  modalOpen,
  setModalOpen,
  authTab,
  setAuthTab,
  setIsLoggedIn,
}: Props) {
  const [loading, setLoading] = useState(false)

  const { create } = usePostSWR('/auth/signup', { showError: true })

  const { setUser } = useAuth()

  const formik = useFormik<Signin>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validarFormSignin,
    onSubmit: async (params: Signin) => {
      try {
        setLoading(true)

        const { token, refreshtoken, user } = await api.post<Result, Params>(
          '/auth/signin',
          {
            arg: params,
          },
        )

        setCookie('token', token)
        setCookie('refreshtoken', refreshtoken)
        setUser(user)
        setIsLoggedIn(true)
        setModalOpen(false)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    },
  })

  const formikCreate = useFormik<Signup>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      accessRole: 'default',
    },
    validationSchema: validarFormSignup,
    onSubmit: async (params: Signup) => {
      try {
        setLoading(true)

        await create<Signup, Result>(params)
        setIsLoggedIn(true)
        setModalOpen(false)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          backgroundColor: '#1e293b',
          padding: '32px',
          borderRadius: '8px',
          width: '400px',
          maxWidth: '90vw',
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}
        >
          Task Manager AI
        </Typography>

        <Tabs
          value={authTab}
          onChange={(e, newValue) => setAuthTab(newValue)}
          centered
          sx={{ marginBottom: 2 }}
        >
          <Tab label="Login" />
          <Tab label="Cadastro" />
        </Tabs>

        <TabPanel value={authTab} index={0}>
          <form onSubmit={formik.handleSubmit}>
            <Input
              formik={formik}
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              maxRows={100}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'hsl(var(--primary))',
                    },
                  },
                },
              }}
            />
            <Input
              formik={formik}
              fullWidth
              margin="normal"
              label="Senha"
              type="password"
              name="password"
              maxRows={120}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              loading={loading}
              sx={{
                backgroundColor: '#00d4aa',
                color: '#0f172a',
                '&:hover': {
                  backgroundColor: '#00b894',
                },
              }}
            >
              Entrar
            </Button>
          </form>
        </TabPanel>

        <TabPanel value={authTab} index={1}>
          <form onSubmit={formikCreate.handleSubmit}>
            <Input
              formik={formikCreate}
              margin="normal"
              fullWidth
              label="Nome completo"
              name="name"
              maxRows={120}
            />

            <Input
              formik={formikCreate}
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              maxRows={100}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'hsl(var(--primary))',
                    },
                  },
                },
              }}
            />
            <Input
              formik={formikCreate}
              fullWidth
              margin="normal"
              label="Senha"
              type="password"
              name="password"
              maxRows={120}
            />
            <Input
              formik={formikCreate}
              fullWidth
              margin="normal"
              label="Repetir senha"
              type="password"
              name="password2"
              maxRows={120}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 2,
                mb: 3,
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              onClick={() => undefined}
              loading={loading}
              sx={{
                backgroundColor: '#00d4aa',
                color: '#0f172a',
                '&:hover': {
                  backgroundColor: '#00b894',
                },
              }}
            >
              Criar conta
            </Button>
          </form>
        </TabPanel>
      </Paper>
    </Modal>
  )
}
