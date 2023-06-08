import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie';

export default function Header(props : {
        isLoged? : boolean,
        inHistory? : boolean,
        inLogin? : boolean,
        inSignIn? : boolean,
        inChat? : boolean,
        inImage? : boolean,
        inHome? : boolean
    })
{
    
    //handle logout button event 
    const handleLogout = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
        event.preventDefault()
        Cookies.remove('token');
        window.location.href = '/';
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            
                <AppBar
                position='static'>
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
                                {!props.inImage && (
                                    <Typography
                                        ml={5}
                                        variant="h6"
                                        noWrap
                                        component={Link}
                                        href="/image"
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
                                        IMAGE
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
