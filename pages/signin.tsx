import React, { useEffect} from 'react'

import Form from '../components/Form'
import Header from '../components/Header';

import { Box } from '@mui/material';

export default function SignIn(): React.JSX.Element {
  useEffect(() =>{
    handleAlreadyLogin();
  },[])

  const handleAlreadyLogin = () => {
    if (localStorage.getItem('userId')) {
      window.location.href = '/chat';
    }
  }
  return (
    <>
      <Header 
        isLoged={false}
        inSignIn={true}/>
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
          isSigned={false}
        />
      </Box>
    </>
  )
}
