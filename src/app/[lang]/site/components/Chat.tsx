import { SmartToy as AIIcon, Message, Send } from '@mui/icons-material'
import {
  Alert,
  Avatar,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { getCookie } from 'cookies-next'
import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { CustomScrollBox } from 'src/components/ScrollBox'
import { usePostSWR } from 'src/infrastructure/hooks'
import { useAuth } from 'src/infrastructure/providers'
import { styles } from '../styles'
import { Typing } from './Typing'

interface Props {
  isLoggedIn: boolean
}

interface Msg {
  text: string
  time: Date
  isUser: boolean
}

const firstMsgIA = {
  text: 'Olá! Sou seu assistente de tarefas. Envie suas demandas e eu organizarei tudo para você! 🤖',
  time: new Date(),
  isUser: false,
}

const errorMsgIA = {
  text: 'Eita, deu algum erro aqui. Pode me dizer novamente o que você precisa?',
  time: new Date(),
  isUser: false,
}

export function Chat({ isLoggedIn }: Props) {
  const { user } = useAuth()
  const token = getCookie('token')

  const [messageInput, setMessageInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([firstMsgIA])
  const [loading, setLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { create } = usePostSWR('/tasks', {
    showError: true,
  })

  async function handleSendMessage() {
    try {
      if (messageInput.trim() && isLoggedIn) {
        setLoading(true)

        setMessages([
          ...messages,
          { isUser: true, time: new Date(), text: messageInput },
        ])

        setMessageInput('')

        const responseIA: Msg = await create({ text: messageInput })

        setMessages((s) => [...s, responseIA])
      }
    } catch (error) {
      console.error(error)
      setMessages((s) => [...s, errorMsgIA])
    } finally {
      setLoading(false)
    }
  }

  const isDesktop = useMediaQuery('(min-width:920px)')

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!user || !token) {
      setMessages([firstMsgIA])
    }
  }, [user, token])

  return (
    <Grid m={2}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Message sx={{ color: '#8b5cf6' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Chat com IA
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: '#94a3b8', marginBottom: 2 }}>
        Envie suas demandas e deixe a IA organizar suas tarefas
      </Typography>

      <Box sx={{ ...styles.chatContainer, width: isDesktop ? '35vw' : '100%' }}>
        <Box sx={styles.chatMessages}>
          <Box sx={styles.aiMessage}>
            <Avatar
              sx={{
                bgcolor: '#00d4aa',
                width: 32,
                height: 32,
              }}
            >
              <AIIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 'bold', color: '#00d4aa' }}
              >
                IA Assistante
              </Typography>
              <Typography variant="caption" sx={{ color: '#10b981' }}>
                ● Online - Pronto para ajudar
              </Typography>
            </Box>
          </Box>

          <CustomScrollBox height={550} scrollbarColor="#00d4aa">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height={isLoggedIn ? 500 : 400}
            >
              {messages.map((m) => (
                <Box key={m.text} mb={1}>
                  {m.isUser ? (
                    <Box>
                      <Box display="flex" justifyContent="flex-end">
                        <Box
                          sx={[
                            styles.messageContent,
                            styles.userMessageContent,
                          ]}
                        >
                          <Typography variant="body2">{m.text}</Typography>
                          <Typography
                            sx={{
                              ...styles.messageTime,
                              textAlign: 'end',
                              color: '#000',
                            }}
                          >
                            {format(m.time, 'HH:mm')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box sx={styles.aiMessage} mb={2}>
                      <Box>
                        <Box
                          sx={[styles.messageContent, styles.aiMessageContent]}
                        >
                          <Typography variant="body2">{m.text}</Typography>
                          <Typography
                            sx={{
                              ...styles.messageTime,
                              textAlign: 'end',
                              color: '#fff',
                            }}
                          >
                            {format(m.time, 'HH:mm')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
              {loading && <Typing />}
            </Box>
            <div ref={messagesEndRef} />
          </CustomScrollBox>
        </Box>

        {/* Chat Input */}
        <Box>
          {!isLoggedIn && (
            <Alert severity="error" sx={styles.loginAlert}>
              Faça login para enviar mensagens e criar tarefas
            </Alert>
          )}
          <TextField
            fullWidth
            placeholder={
              isLoggedIn
                ? 'Digite sua mensagem...'
                : 'Login necessário para enviar mensagens'
            }
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            disabled={!isLoggedIn}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSendMessage}
                    disabled={!isLoggedIn || !messageInput.trim()}
                    sx={{ color: '#00d4aa' }}
                  >
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
        </Box>
      </Box>
    </Grid>
  )
}
