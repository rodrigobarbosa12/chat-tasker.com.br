'use client'

import { Assignment, CalendarToday, Search } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { format } from 'date-fns'
import { ChangeEvent } from 'react'
import { CustomScrollBox } from 'src/components/ScrollBox'
import { Task } from 'src/infrastructure/@types/tasks'
import { styles } from '../styles'

interface Props {
  tasks?: Task[]
  isLoggedIn: boolean
  search: string
  priorityFilter: string
  currentPage: number
  setSearch: (x: string) => void
  setPriorityFilter: (x: string) => void
  setCurrentPage: (x: number) => void
}

export function ManagerTasks({
  tasks,
  isLoggedIn,
  search,
  priorityFilter,
  currentPage,
  setSearch,
  setPriorityFilter,
  setCurrentPage,
}: Props) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return styles.highPriority
      case 'medium':
        return styles.mediumPriority
      case 'low':
        return styles.lowPriority
      default:
        return {}
    }
  }

  const getPriorityName = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta 🔥'
      case 'medium':
        return 'Média'
      case 'low':
        return 'Baixa'
      default:
        return ''
    }
  }

  const isDesktop = useMediaQuery('(min-width:920px)')

  return (
    <Grid m={2}>
      <Box sx={{ width: isDesktop ? '60vw' : '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Assignment sx={{ color: '#8b5cf6' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Suas Tarefas
          </Typography>
        </Box>

        <Box sx={styles.tasksHeader}>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            Visualize, filtre e gerencie suas tarefas criadas pela IA
          </Typography>
          <Chip
            label={`${tasks?.length || 0} Tarefas`}
            size="small"
            sx={{ backgroundColor: '#8b5cf6', color: '#fff' }}
          />
        </Box>

        {!isLoggedIn && (
          <Alert severity="error" sx={styles.loginAlert}>
            Faça login para gerenciar suas tarefas
          </Alert>
        )}

        {/* Filters */}
        <Box sx={styles.filterSection}>
          <TextField
            size="small"
            placeholder="Buscar tarefas..."
            value={search}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            disabled={!isLoggedIn}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#94a3b8' }} />
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1 }}
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              disabled={!isLoggedIn}
            >
              <MenuItem value="Todas as prioridades">
                Todas as prioridades
              </MenuItem>
              <MenuItem value="Alta">Alta</MenuItem>
              <MenuItem value="Média">Média</MenuItem>
              <MenuItem value="Baixa">Baixa</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Tasks List */}
        <CustomScrollBox
          height={isLoggedIn ? 620 : 565}
          scrollbarColor="#8a5cf6cb"
        >
          {tasks?.length
            ? tasks.map((task) => (
                <Card key={task.id} sx={styles.taskItem}>
                  <CardContent>
                    <Box sx={styles.taskHeader}>
                      <Typography variant="h6" sx={styles.taskTitle}>
                        {task.title}
                      </Typography>
                      <Chip
                        label={getPriorityName(task.priority)}
                        size="small"
                        sx={[
                          styles.priorityChip,
                          getPriorityColor(task.priority),
                        ]}
                      />
                    </Box>

                    <Typography variant="body2" sx={styles.taskDescription}>
                      {task.description}
                    </Typography>

                    <Box
                      sx={{
                        backgroundColor: '#8b5cf6',
                        color: '#fff',
                        padding: '8px',
                        borderRadius: '4px',
                        marginBottom: '12px',
                      }}
                    >
                      <Typography variant="caption">
                        💡 {task.priorityExplain}
                      </Typography>
                    </Box>

                    <Box sx={styles.taskMeta}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <CalendarToday sx={{ fontSize: 14 }} />
                        <Typography variant="caption">
                          Criado em:{' '}
                          {format(task.createdAt, 'dd/MM/yyyy HH:mm')}
                        </Typography>
                      </Box>
                      <Button size="small" sx={{ color: '#00d4aa' }}>
                        📱 Via chat
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))
            : null}
        </CustomScrollBox>

        {/* Pagination */}
        <Box sx={styles.pagination}>
          <Typography variant="body2" sx={{ color: '#94a3b8', marginRight: 2 }}>
            Página 1 de 2
          </Typography>
          <Pagination
            count={2}
            page={currentPage}
            onChange={(e, page) => setCurrentPage(page)}
            color="primary"
            size="small"
          />
        </Box>
      </Box>
    </Grid>
  )
}
