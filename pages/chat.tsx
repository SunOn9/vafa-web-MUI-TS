import React from 'react'

import Header from '@/components/Header'
import { Typography } from '@mui/material'
export default function chat() {
  return (
    <>
        <Header
          isLoged={true}
          inChat={true}/>
        <Typography 
            variant='h4'
        >
            Chat
        </Typography>
    </>
  )
}
