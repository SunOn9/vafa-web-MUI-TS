import React from 'react'
import { Box, TextField, FormControl, Button, Alert, Snackbar, SnackbarOrigin, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import {useState} from 'react'
import { ObjectId } from 'mongodb';

export interface State extends SnackbarOrigin {
  open: boolean;
  message: string;
  email?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
}

export default function Form(props: {isSigned: boolean}) {
  const {push} = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<State>({
    open: false,
    email: false,
    password: false,
    confirmPassword: false,
    message: '',
    vertical: 'top',
    horizontal: 'center',})
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const regex = new RegExp("^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$");

  const onCloseSuccess = () => {
    setSuccess(false)
  }
  const onClose = () => {
    setError({
      ...error,
      open: false,
      email: false,
      password: false,
      confirmPassword: false,
      message: '',
      })
  }
  const validateLogin = () => {
    if (!email) {
      setError({...error, email: true, open: true, message: 'Email is required'})
      return false
    }
    if(!regex.test(email)) {
      setError({...error, email: true, open: true, message:'Email is not valid'})
      return false
    }
    if (password.length < 8) {
      setError({...error, password: true, open: true, message:'Password must be at least 8 characters'})
      return false
    }
    if (!password) {
      setError({...error, password: true, open: true, message:'Password is required'})
      return false
    }
    return true
  }

  const validateSignIn = () => {
    if (!email) {
      setError({...error, email: true, open: true, message:'Email is required'})
      return false
    }
    if(!regex.test(email)) {
      setError({...error, email: true, open: true, message:'Email is not valid'})
      return false
    }
    if (password.length < 8) {
      setError({...error,  password: true, open: true, message:'Password must be at least 8 characters'})
      return false
    }
    if (!password) {
      setError({...error,  password: true, open: true, message:'Password is required'})
      return false
    }
    if (!confirmPassword) {
      setError({...error,  confirmPassword: true, open: true, message:'Confirm password is required'})
      return false
    }
    if (password !== confirmPassword) {
      setError({...error, password: true, confirmPassword: true, open: true, message:'Passwords do not match'})
      return false
    }
    return true
  }

  const checkLogin = async () => {
    const query = {
      email: email
    }
    const response = await fetch("/api/findUser", {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify(query)
    });
    

    const data = await response.json();

    if (data == null) {
      setError({...error, email: true, open: true, message: 'User does not exist'})
      return -1
    }
    if (data.password !== password) {
      setError({...error, password: true, open: true, message: 'Password does not match'})
      return -1
    }
    const id : string = data._id.toString()

    return id
  }
  const checkSignIn = async () => {
    const query = {
      email: email
    }
    const response = await fetch("/api/findUser", {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify(query)
    });
    
    const data = await response.json();

    if (data == null) {
      return true
    }
    else {
      try {
        const thisId = data._id
        setError({...error, email: true, open: true, message: 'This email is registered'});
        return false
      }
      catch{
        setError({...error, open: true, message: 'Something went wrong'});
        return false
      }
    }
  }

  const createUser = async () => {
    const query = {
      email: email,
      password: password
    }
    const response = await fetch("/api/createUser", {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify(query)
    });
    
    const data = await response.json();
  }

  const handleLogin = async (event  : any) =>{
    event.preventDefault();

    if (validateLogin()){
      setLoading(true);
      const userId = await checkLogin()
      if (userId !== -1){
        push({
          pathname: '/chat',
          query: { id: userId }
          }, '/chat')
      }
      setLoading(false);
    }
  }
  const handleSignin = async (event: any) => {
    event.preventDefault();

    if (validateSignIn()){
      setLoading(true);
      if (await checkSignIn()){
        createUser()
        setSuccess(true)
      }
      setLoading(false);
    }
    
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
          disabled={loading}
          onChange={(e)=>setEmail(e.target.value)}
          error={error.email}
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
          disabled={loading}
          onChange={(e)=>setPassword(e.target.value)}
          error={error.password}
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
            disabled={loading}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            error={error.confirmPassword}
            sx={{
              m: 1
            }}/>
        }
        <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
              }}
        >
          {!props.isSigned ?  (
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 2,
                }}>
                Sign In
            </Button>
          ):(
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
              }}>
              Login
            </Button>
          )}
          {loading && (
                  <CircularProgress
                    size={50}
                    sx={{
                      position: 'absolute',
                    }}
                  />
                )}
        </Box>
      </FormControl>
      <Snackbar open={error.open} onClose={onClose} autoHideDuration={2000}>
        <Alert severity="warning" sx={{ width: '100%' }}>
          {error.message}
        </Alert>
      </Snackbar>
      <Snackbar open={success} onClose={onCloseSuccess} autoHideDuration={2000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Account successfully created
        </Alert>
      </Snackbar>
    </> 
  )
}