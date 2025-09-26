import Box from '@mui/material/Box'
import React from 'react'

export type Props = {
  width?: string
  height?: string | number
  scrollbarColor?: string
  children: React.ReactNode
}

export function CustomScrollBox({
  children,
  width = '100%',
  height = 300,
  scrollbarColor = '#ef4444ff',
}: Props) {
  return (
    <Box
      sx={{
        width,
        height,
        borderRadius: 2,
        boxShadow: 3,
        overflow: 'auto',
        p: 2,
        position: 'relative',
        backgroundColor: 'background.paper',
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(180deg, #6366f1, #ef4444)',
          borderRadius: '10px',
          minHeight: '40px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          filter: 'brightness(1.1)',
        },
        /* Firefox */
        scrollbarWidth: 'thin',
        scrollbarColor: `${scrollbarColor} transparent`,
      }}
    >
      {children}
    </Box>
  )
}

/* =====================
   Example usage:

   import ScrollContainer from './ScrollContainer';

   export default function Demo() {
     return (
       <ScrollContainer width="28rem" height="20rem">
         {[...Array(20)].map((_, i) => (
           <Box
             key={i}
             sx={{
               p: 2,
               mb: 1,
               borderRadius: 1,
               bgcolor: "grey.100",
               boxShadow: 1,
             }}
           >
             Item {i + 1}
           </Box>
         ))}
       </ScrollContainer>
     );
   }

   ===================== */
