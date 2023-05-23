import React from 'react'
import { Box, TextField, FormControl, Button, Alert, Snackbar, SnackbarOrigin } from '@mui/material'
import { useRouter } from 'next/router'
import {useState} from 'react'
import { Message } from '@mui/icons-material';

export interface State extends SnackbarOrigin {
  open: boolean;
  message: string;
}

export default function Form(props: {isSigned: boolean}) {
  const router = useRouter()
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<State>({
    open: false,
    message: '',
    vertical: 'top',
    horizontal: 'center',})
  const [loading, setLoading] = useState(false)

  const regex = new RegExp('^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$');

  const validateLogin = () => {
    if (!email) {
      setError({...error, open: true, message: 'Email is required'})
      return false
    }
    if(regex.test(email)) {
      setError({...error, open: true, message:'Email is not valid'})
      return false
    }
    if (password.length < 8) {
      setError({...error, open: true, message:'Password must be at least 8 characters'})
      return false
    }
    if (!password) {
      setError({...error, open: true, message:'Password is required'})
      return false
    }
    return true
  }

  const validateSignIn = () => {
    if (!email) {
      setError({...error, open: true, message:'Email is required'})
      return false
    }
    if(regex.test(email)) {
      setError({...error, open: true, message:'Email is not valid'})
      return false
    }
    if (password.length < 8) {
      setError({...error, open: true, message:'Password must be at least 8 characters'})
      return false
    }
    if (!password) {
      setError({...error, open: true, message:'Password is required'})
      return false
    }
    if (!confirmPassword) {
      setError({...error, open: true, message:'Confirm password is required'})
      return false
    }
    if (password !== confirmPassword) {
      setError({...error, open: true, message:'Passwords do not match'})
      return false
    }
    return true
  }

  const handleLogin = (event  : any) =>{
    event.preventDefault();

    {validateLogin() &&
      setLoading(true)}
    
  }
  const handleSignin = (event: any) => {
    event.preventDefault();

    {validateSignIn() &&
      setLoading(true)}
    
  }
  
  return (
    <>
      <FormControl
        component="form"
        {...props.isSigned ? ({onSubmit: handleLogin}):({onSubmit: handleSignin})}
        autoComplete="off"
        noValidate
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
        <TextField 
          id="email"
          placeholder="Enter email address..."
          label="Email"
          variant="outlined"
          required
          onChange={(e)=>setEmail(e.target.value)}
          sx={{
            m: 1
          }}/>
        <TextField 
          id="password"
          type="password"
          placeholder="Enter password..."
          label="Password"
          variant="outlined"
          required
          onChange={(e)=>setPassword(e.target.value)}
          sx={{
            m: 1
          }}/>
        {!props.isSigned &&
          <TextField 
            id="confirmPassword"
            type="password"
            placeholder="Confirm password..."
            label="Confirm password"
            variant="outlined"
            required
            autoComplete='off'
            onChange={(e)=>setConfirmPassword(e.target.value)}
            sx={{
              m: 1
            }}/>
        }
        {!props.isSigned ?  (
          <>
            <Button
            type="submit"
            variant="contained"
            {...loading && ({disabled: true})}
            sx={{
              mt: 2,
            }}>
            Sign In
          </Button>
          </>
        ):(
          <>
            <Button
              type="submit"
              variant="contained"
              {...loading && ({disabled: true})}
              sx={{
                mt: 2,
              }}>
              Login
            </Button>
          </>
        )}
      </FormControl>
      <Snackbar open={error.open} autoHideDuration={6000}>
        <Alert severity="warning" sx={{ width: '100%' }}>
          {error.message}
        </Alert>
      </Snackbar>
    </>
      

  )
}

