import React from 'react'
import { Box, TextField, FormControl, Button, Alert, Snackbar, SnackbarOrigin, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import {useState} from 'react'

export interface State extends SnackbarOrigin {
  open: boolean;
  message: string;
}
export interface formState {
  error: boolean ;
  message: string;
}

export interface stateForm{
  email: formState;
  password: formState;
  confirmPassword: formState;
}
export default function Form(props: {isSigned: boolean}) {
  const {push} = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<State>({
    open: false,
    message: '',
    vertical: 'top',
    horizontal: 'center',
  })
  const [stateForm, setStateFrom] = useState<stateForm>({
    email: {
      error: true,
      message: '',
    },
    password: {
      error: true,
      message: '',
    },
    confirmPassword: {
      error: true,
      message: '',
    }
  })
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
        message: '',
      })
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
      setError({...error, open: true, message: 'User does not exist'})
      setStateFrom({...stateForm, email : {
        error: true,
        message: ''
      }})
      return -1
    }
    if (data.password !== password) {
      setError({...error, open: true, message: 'Password does not match'})
      setStateFrom({...stateForm, password : {
        error: true,
        message: ''
      }})
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
        setError({...error, open: true, message: 'This email is registered'});
        setStateFrom({...stateForm, email : {
          error: true,
          message: ''
        }})
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
    
    setLoading(true);
    if (!stateForm.email.error && !stateForm.password.error){
      const userId = await checkLogin()
      if (userId !== -1){
        localStorage.setItem('userId', userId);
        push('/chat');
      }
    } 
    else setError({...error, open: true, message: "Please check your input"})
      
    setLoading(false);
  }
  const handleSignin = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    if (!stateForm.email.error && !stateForm.password.error && !stateForm.confirmPassword.error) {
      if (await checkSignIn()){
        createUser()
        setSuccess(true)
      }
    }
    else setError({...error, open: true, message: 'Please check your input'})

    setLoading(false);
    
    
  }
  const handleEmailChange = async (event: any) => {
    setEmail(event.target.value)
    
    if (!event.target.value) {
      setStateFrom({...stateForm, email: {error : true,  message:'Email is required'}})
    }
    else if(!regex.test(event.target.value)) {
      setStateFrom({...stateForm, email: {error : true, message:'Email is not valid'}})
    } else {
      setStateFrom({...stateForm ,email: {error : false, message:'Please fill all the required fields'}})
    }
  }

  const handlePasswordChange = async (event: any) => {
    setPassword(event.target.value)
    if (!event.target.value) {
      setStateFrom({...stateForm, password: {error : true, message:'Password is required'}})
    }
    else if (event.target.value.length < 8) {
      setStateFrom({...stateForm, password: {error : true,  message:'Password must be at least 8'}})
    } else {
      setStateFrom({...stateForm , password: {error : false, message:'Please fill all the required fields'}})
    }
  }

  const handleConfirmPasswordChange = async (event: any) => {
    if (!event.target.value) {
      setStateFrom({...stateForm, confirmPassword: {error : true, message:'Confirm password is required'}})
    }
    else if (password !== event.target.value) {
      setStateFrom({...stateForm, confirmPassword: {error : true, message:'Passwords do not match'}})
    } else {
      setStateFrom({...stateForm, confirmPassword: {error : false, message:'Please fill all the required fields'}})
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
          disabled={loading}
          onChange={handleEmailChange}
          error={stateForm.email.error}
          helperText={stateForm.email.error ? (stateForm.email.message) : ''}
          sx={{
            m: 2
          }}/>
        <TextField 
          id="password"
          type="password"
          placeholder="Enter password..."
          label="Password"
          variant="outlined"
          disabled={loading}
          onChange={handlePasswordChange}
          error={stateForm.password.error}
          helperText={stateForm.password.error ? (stateForm.password.message) : ''}
          sx={{
            m: 2
          }}/>
        {!props.isSigned &&
          <TextField 
            id="confirmPassword"
            type="password"
            placeholder="Confirm password..."
            label="Confirm password"
            variant="outlined"
            disabled={loading}
            onChange={handleConfirmPasswordChange}
            error={stateForm.confirmPassword.error}
          helperText={stateForm.confirmPassword.error ? stateForm.confirmPassword.message : ''}
            sx={{
              m: 2
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