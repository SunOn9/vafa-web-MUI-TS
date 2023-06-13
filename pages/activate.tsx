import { useMutation } from '@apollo/client'
import { Box, Button, Stack, Typography, Link } from '@mui/material'
import { useRouter } from 'next/router'
import { ACTIVATE_USER } from './apollo-client/mutations'
import { useState } from 'react'


export default function Activate(): React.JSX.Element {
    const router = useRouter()
    const token = router.query.token?.toString()
    const email = router.query.email?.toString()    
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    
    const [activate, {loading}] = useMutation(ACTIVATE_USER)

    const handleClick = async (event: any) => {
        event.preventDefault()

        if (token && email) {
            const {data} = await activate({variables: {input: token}})

            if (data && data.activateUser) {
                if (data.activateUser.success) {
                    if (data.activateUser.error) {
                        setError(true)
                    }
                    setSuccess(data.activateUser.success)
                }
            } else {
                setError(true)
            }
        }
    }


    return (
        <>
            <Stack
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100vw',
                }}>
                {!success ? (
                    <Box
                        sx={{
                            p: 5,
                            bgcolor: 'background.paper',
                            boxShadow: 2,
                            borderRadius: 2,
                            minWidth: 300,
                        }}
                    >
                        <Typography
                            variant='h2'
                            sx={{
                                
                            }}>
                                VAFA
                        </Typography>
                        <Typography
                            variant='h4'
                            sx={{
                                mt: '4vh',
                            }}>
                            Activate your account
                        </Typography>
                        <Typography
                            
                            sx={{
                                mt: '3vh',
                            }}>
                            Hi {email}, you are created a new user account at <Link href="/">VAFA</Link>.
                            All you have to do is activate it!
                        </Typography>
                        <Stack
                            direction='row'
                            spacing='4rem'
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mt: '5vh'
                            }}
                        >
                            <Button
                                variant='contained'
                                onClick={handleClick}
                                sx={{
                                    fontSize: '20'
                                }}
                            >
                                Activate your account
                            </Button>
                            <Typography>
                                OR
                            </Typography>
                            <Typography 
                                component={Link}
                                href='/'
                            >
                                Visit our page
                            </Typography>
                        </Stack>
                    </Box>
                ) : (
                    <Box
                    sx={{
                        p: 5,
                        bgcolor: 'background.paper',
                        boxShadow: 2,
                        borderRadius: 2,
                        minWidth: 300,
                    }}
                    >
                        <Typography
                            variant='h4'
                            sx={{
                                mt: '4vh',
                            }}>
                            {!error ? ('Your account has been activate!') : ('Your account was activated!')}
                        </Typography>
                        <Typography
                            sx={{
                                mt: '3vh',
                            }}>
                            {!error ? 
                                (
                                    'Congratulations! Your new account has been successfully activated! You can now take advantage of our services.'
                                ) : (
                                    'Your account has been activated before. You can use your account to login to our website'
                                )}
                        </Typography>
                        <Button
                            variant='contained'
                            onClick={() => {router.push('/')}}
                            sx={{
                                mt: '3vh',
                                fontSize: '20'
                            }}
                        >
                            Continue
                        </Button>
                    </Box>
                )}
            </Stack>
        </>
    )
}