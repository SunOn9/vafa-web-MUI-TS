import React, { useEffect, useState} from 'react'
import Header from '../components/Header';

import { Alert, Box, Button, CircularProgress, Snackbar, Stack, TextField } from '@mui/material';
import { Field, Formik } from 'formik';
import { useLazyQuery } from "@apollo/client"
import { GET_USER_BY_EMAIL } from './apollo-client/querries';
import * as Yup from 'yup';
import Cookies from 'js-cookie';

interface errorLogin{
  error: boolean;
  message: string;
}

export default function Login() {
  const [errorLogin, setErrorLogin] = useState<errorLogin>({
    error: false,
    message: ''
  })

  useEffect(() =>{
    handleAlreadyLogin();
  },[])

  const handleAlreadyLogin = () => {
    if (Cookies.get('userId')) {
      window.location.href = '/chat';
    }
  }

  const regex = new RegExp("^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$")

  const [getUser, {loading}] = useLazyQuery(GET_USER_BY_EMAIL)

  const handleLogin = async (props : any) => {
    const {data} = await getUser({ variables: { email: props.email } })
    if(data && data.user){
      if (props.password === data.user.password){
        Cookies.set('userId', data.user._id)
        window.location.href = '/chat';
      }else{
        setErrorLogin({
          error: true,
          message: 'Wrong password'
        })
      }
    }else{
      setErrorLogin({
        error: true,
        message: 'Email address is not associated with any account'
      })
    }
  }

  const onClose = () => {
    setErrorLogin({
      error : false,
      message: ''
    })
  }
  
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
