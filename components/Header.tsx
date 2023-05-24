import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function Header(props : {
        isLoged? : boolean,
        inHistory? : boolean,
        inLogin? : boolean,
        inSignIn? : boolean,
        inChat? : boolean,
        inHome? : boolean,
        userId? : string | string[] | undefined,
    })
{
    const router = useRouter()

    const currentId = props.userId

    //handle logout button event 
    const handleLogout = (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault()

        router.push({
          pathname: '/',
          query: { id: '' }
          }, '/')
    }
    //handle chat button event 
    const handleChat = (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault()

        router.push({
          pathname: '/chat',
          query: { id: currentId }
          }, '/chat')
    }
    //handle history button event 
    const handleHistory = (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault()
        console.log(currentId)
        router.push({
            pathname: '/history',
            query: { id: currentId }
            }, '/history')
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <Box sx={{flexGrow: 1}}>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            VAFA
                        </Typography>
                    </Box>
                    {!props.isLoged ? (
                        <Box>
                            {!props.inHome && (
                                <Typography
                                    ml={5}
                                    variant="h6"
                                    noWrap
                                    component={Link}
                                    href="/"
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        "&:hover": {
                                            color: 'primary.main',
                                          }
                                    }}
                                >
                                    HOME
                                </Typography>
                            )}
                            {!props.inLogin && (
                                <Typography
                                    ml={5}
                                    variant="h6"
                                    noWrap
                                    component={Link}
                                    href="/login"
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        "&:hover": {
                                            color: 'primary.main',
                                          }
                                    }}
                                >
                                    LOGIN
                                </Typography>
                            )}
                            {!props.inSignIn && (
                                 <Typography
                                    ml={5}
                                    variant="h6"
                                    noWrap
                                    component={Link}
                                    href="/signin"
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        "&:hover": {
                                            color: 'primary.main',
                                          }
                                    }}
                                >
                                    SIGN-IN
                                </Typography>
                            )}
                        </Box>
                    ):(
                        <Box>
                            {!props.inChat && (
                                <Typography
                                    ml={5}
                                    variant="h6"
                                    noWrap
                                    component={Link}
                                    href=""
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        "&:hover": {
                                            color: 'primary.main',
                                          }
                                    }}
                                    onClick={handleChat}
                                >
                                    CHAT
                                </Typography>
                            )}
                            {!props.inHistory && (
                                <Typography
                                    ml={5}
                                    variant="h6"
                                    noWrap
                                    component={Link}
                                    href=""
                                    sx={{
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        "&:hover": {
                                            color: 'primary.main',
                                          }
                                    }}
                                    onClick={handleHistory}
                                >
                                    HISTORY
                                </Typography>
                            )}
                            <Typography
                                ml={5}
                                variant="h6"
                                noWrap
                                component={Link}
                                href=""
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    "&:hover": {
                                        color: 'primary.main',
                                      }
                                }}
                                onClick={handleLogout}
                            >
                                LOG-OUT
                            </Typography>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}
