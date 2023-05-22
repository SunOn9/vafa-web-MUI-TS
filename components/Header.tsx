import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function Header(props : {
        isLoged? : boolean,
        inHistory? : boolean,
        inLogin? : boolean,
        inSignIn? : boolean,
        inChat? : boolean,
        inHome? : boolean,
    })
{
    const router = useRouter()

    //handle logout button event 
    const handleLogout = (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault()

        router.push('/')
    }
    //handle chat button event 
    const handleChat = (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault()

        router.push('/chat')
    }
    //handle history button event 
    const handleHistory = (event: React.MouseEvent<HTMLElement>): void => {
        event.preventDefault()

        router.push('/history')
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
