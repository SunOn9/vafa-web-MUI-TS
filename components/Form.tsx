import React from 'react'
import { Box, TextField, FormControl, Button  } from '@mui/material'

export default function Form(props: {isSigned: boolean}) {
  return (
      <FormControl
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField 
          id="email"
          placeholder="Enter email address..."
          label="Email"
          variant="outlined"
          required/>
        <TextField 
          id="password"
          type="password"
          placeholder="Enter password..."
          label="Password"
          variant="outlined"
          required/>
        {!props.isSigned &&
          <TextField 
            id="confirmPassword"
            type="password"
            placeholder="Confirm password..."
            label="Confirm password"
            variant="outlined"
            required/>
        }
        {!props.isSigned ?  (
          <Button
            type="submit"
            variant="contained">
            Sign In
          </Button>
        ):(
          <Button
            type="submit"
            variant="contained">
            Login
          </Button>
        )}
      </FormControl>
  )
}

