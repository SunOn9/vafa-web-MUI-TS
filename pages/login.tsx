import React, { useState } from 'react'
import Header from '../components/Header';
import {useMutation} from '@apollo/client';
import { Alert, Box, Button, CircularProgress, Link, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { LOGIN, SEND_MAIL } from './apollo-client/mutations';

interface errorLogin{
  error: boolean;
  message: string;
}

export default function Login() {
  const [errorLogin, setErrorLogin] = useState<errorLogin>({
    error: false,
    message: ''
  })

  const [login, {loading}] = useMutation(LOGIN)
  

  const handleLogin = async (props : any) => {
    
    const {data} = await login({ variables: {
      loginUserInput: {
        email: props.email,
        password: props.password
      }
    }}) 

    if(data && data.login && data.login.access_token){
      Cookies.set('token', data.login.access_token)
      window.location.href = '/chat';
    }
    else{
      setErrorLogin({
        error: true,
        message: data.login.error
      })
    }
  }

  const onClose = () => {
    setErrorLogin({
      error : false,
      message: ''
    })
  }

  const regex = new RegExp("^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$")
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email required')
      .matches(regex, 'Invalid email'),
    password: Yup.string()
      .required('Password required')
      .min(8, 'Password lenght at least 8!')
      .max(30, 'Password lenght max at 30!')
  });

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
        <Formik
          onSubmit={async data => {
            handleLogin(data);
          }}
          validationSchema={LoginSchema}
          initialValues={{
            email: "",
            password: ""
          }}
        >
          {({ handleSubmit , handleChange, touched, errors}) => (
            <form 
              onSubmit={handleSubmit}
              autoComplete="off"
              noValidate
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '90vh',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                <Stack
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 5,
                    bgcolor: 'background.paper',
                    boxShadow: 2,
                    borderRadius: 2,
                    minWidth: 300,
                  }}
                >
                  <Field
                    component={TextField}
                    id="email"
                    placeholder="Enter email address..."
                    label="Email"
                    variant="outlined"
                    onChange={handleChange}
                    disabled={loading}
                    error={errors.email && touched.email}
                    helperText={touched.email && errors.email}
                    sx={{
                      m: 2
                    }}
                  />
                  <Field
                    component={TextField}
                    id="password"
                    type="password"
                    placeholder="Enter password..."
                    label="Password"
                    variant="outlined"
                    onChange={handleChange}
                    disabled={loading}
                    error={errors.password && touched.password}
                    helperText={touched.password && errors.password}
                    sx={{
                      m: 2
                    }}
                  />
                  <Button
                    onClick={()=>{window.location.href = '/forgotPassword';}}>
                    Forgot password ?
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      mt: 2,
                    }}>
                    Login
                  </Button>
                </Stack>
                
              </Box>
            </form>
            
          )}
        </Formik>
        {loading && (
          <CircularProgress
            size={50}
            sx={{
              position: 'absolute',
            }}
          />
        )}
        <Snackbar open={errorLogin.error} onClose={onClose} autoHideDuration={2000}>
          <Alert severity="warning" sx={{ width: '100%' }}>
            {errorLogin.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  )
}
