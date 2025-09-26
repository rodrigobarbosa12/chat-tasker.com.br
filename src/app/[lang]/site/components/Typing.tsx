import { SmartToy as AIIcon } from '@mui/icons-material'
import { Avatar, Box, ListItem, Paper } from '@mui/material'

export function Typing() {
  return (
    <>
      <ListItem sx={{ px: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            sx={{
              bgcolor: '#00ba66',
              width: 32,
              height: 32,
            }}
          >
            <AIIcon fontSize="small" />
          </Avatar>
          <Paper
            sx={{
              px: 3,
              py: 2,
              bgcolor: '#99999929',
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: '#00d4aa',
                    borderRadius: '50%',
                    animation: 'pulse 1.5s infinite',
                    animationDelay: `${i * 0.2}s`,
                    '@keyframes pulse': {
                      '0%, 80%, 100%': { opacity: 0.3 },
                      '40%': { opacity: 1 },
                    },
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Box>
      </ListItem>
    </>
  )
}
