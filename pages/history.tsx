import React from 'react'

import Header from '@/components/Header'
import {Typography} from '@mui/material'
export default function History(): React.JSX.Element {
  return (
    <>
        <Header
          isLoged={true}
          inHistory={true}/>
        <Typography 
            variant='h4'
        >
            History
        </Typography>
    </>
  )
}
