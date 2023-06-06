import React, { useEffect, useState} from 'react'

import Header from '../components/Header';

import { Alert, Box, Button, CircularProgress, Snackbar, Stack, TextField } from '@mui/material';
import { Field, Formik } from 'formik';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_USER_BY_EMAIL } from './apollo-client/querries';
import { CREATE_USER } from './apollo-client/mutations';
import * as Yup from 'yup';
import Cookies from 'js-cookie';

interface errorSignIn{
  error: boolean;
  message: string;
}

interface successSignIn{
  success: boolean;
  username: any;
}

export default function SignIn(): React.JSX.Element {
  const [errorSignIn, setSignInError] = useState<errorSignIn>({
    error: false,
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<successSignIn>({
    success: false,
    username: ''
  })

  useEffect(() =>{
    handleAlreadyLogin();
  },[])

  const handleAlreadyLogin = () => {
    if (Cookies.get('userId')) {
      window.location.href = '/chat';
    }
  }

  

  const [getUser] = useLazyQuery(GET_USER_BY_EMAIL)

  const [postUser] = useMutation(CREATE_USER)


  const handleSignIn = async (props : any) => {
    setLoading(true)

    const {data} = await getUser({variables: {email: props.email}})

    if (data && data.user) {
      setSignInError({
        error: true,
        message: 'This email has already been registered!'
      })
    }
    else {
      const {data} = await postUser({ variables: {
        input: {
          emailField: props.email,
          passwordField: props.password
        }
      }})
      if (data && data.createUser){
        setSuccess({
          success: true,
          username: data.createUser.email
        })
      }
    }
    setLoading(false)
  }

  const regex = new RegExp("^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$")
  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email required')
      .matches(regex, 'Invalid email'),
    password: Yup.string()
      .required('Password required')
      .min(8, 'Password lenght at least 8!')
      .max(30, 'Password lenght max at 30!'),
    confirmPassword: Yup.string()
      .required('Confirm password required')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });

  const onClose = () => {
    setSignInError({
      error: false,
      message: ''
    })
  }
  const onCloseSuccess= () => {
    setSuccess({
      success: false,
      username: ''
    })
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
          <Formik
            onSubmit={async data => {
              handleSignIn(data);
            }}
            validationSchema={SignInSchema}
            initialValues={{
              email: "",
              password: "",
              confirmPassword: ""
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
                    <Field
                      component={TextField}
                      id="confirmPassword"
                      type="password"
                      placeholder="Enter confirm password..."
                      label="Confirm password"
                      variant="outlined"
                      onChange={handleChange}
                      disabled={loading}
                      error={errors.confirmPassword && touched.confirmPassword}
                      helperText={touched.confirmPassword && errors.confirmPassword}
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
                      Sign In
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
      </Box>
      <Snackbar open={errorSignIn.error} onClose={onClose} autoHideDuration={2000}>
          <Alert severity="warning" sx={{ width: '100%' }}>
            {errorSignIn.message}
          </Alert>
        </Snackbar>
        <Snackbar open={success.success} onClose={onCloseSuccess} autoHideDuration={2000}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Account {success.username} successfully created!
          </Alert>
        </Snackbar>
    </>
  )
}
