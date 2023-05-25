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
        inHome? : boolean
    })
{
    const router = useRouter()


    //handle logout button event 
    const handleLogout = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
        event.preventDefault()
        localStorage.clear();
        router.push('/')
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
                                    href="/chat"
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
                                    CHAT
                                </Typography>
                            )}
                            {!props.inHistory && (
                                <Typography
                                    ml={5}
                                    variant="h6"
                                    noWrap
                                    component={Link}
                                    href="/history"
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
