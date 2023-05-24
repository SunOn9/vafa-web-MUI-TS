import React from 'react'

import Form from '../components/Form'
import Header from '../components/Header';

import { Box } from '@mui/material';

export default function Login(): React.JSX.Element {
  return (
    <>
      <Header
        isLoged={false}
        inLogin={true}/>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '90vh',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
        <Form 
          isSigned={true}
        />
        
      </Box>
    </>
  )
}
