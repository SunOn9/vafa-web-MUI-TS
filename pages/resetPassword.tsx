import { useMutation } from '@apollo/client'
import { Box, Button, Stack, TextField, CircularProgress, Snackbar, Alert, Typography, Link } from '@mui/material'
import { useRouter } from 'next/router'
import { CHANGE_PASSWORD } from './apollo-client/mutations'
import { useState } from 'react'
import { Field, Formik } from 'formik'
import * as Yup from 'yup';

interface errorLogin{
    error: boolean;
    message: string;
}

export default function Activate(): React.JSX.Element {
    const router = useRouter()
    const token = router.query.token?.toString()
    const email = router.query.email?.toString()    
    const [error, setError] = useState<errorLogin>({
        error: false,
        message: ''
    })
    const [success, setSuccess] = useState(false)
    const [changePassword, {loading}] = useMutation(CHANGE_PASSWORD)
    
    const handleSubmit = async (props: any) => {
        if (token && email) {
            const {data} = await changePassword({variables: {input: {
                id: token,
                oldPassword: props.oldPassword,
                password: props.password
            }}})
            if (data.changePassword) {
                setSuccess(true)
            } else {
                setError({
                    error: true,
                    message: "Invalid token!"
                })
            }
        } else {
            setError({
                error: true,
                message: "Invalid token!"
            })
        }
    }

    const onClose = () => {
        setError({
            error: true,
            message: ''
        })
    }
    const Schema = Yup.object().shape({
        oldPassword: Yup.string()
            .required('Old password required')
            .min(8, 'Old password lenght at least 8!')
            .max(30, 'Old password lenght max at 30!'),
        password: Yup.string()
            .required('Password required')
            .min(8, 'Password lenght at least 8!')
            .max(30, 'Password lenght max at 30!'),
        confirmPassword: Yup.string()
            .required('Confirm password required')
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    return (
        <>
            {!success ? (
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
                    <Formik
                    onSubmit={async data => {
                        handleSubmit(data);
                    }}
                    validationSchema={Schema}
                    initialValues={{
                        oldPassword: "",
                        password: "",
                        confirmPassword: "",
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
                                    <Typography
                                        variant='h6'>
                                        Reset password <br/>
                                        {email}
                                    </Typography>
                                    <Field
                                        component={TextField}
                                        id="oldPassword"
                                        type="password"
                                        placeholder="Enter old password..."
                                        label="Old password"
                                        variant="outlined"
                                        onChange={handleChange}
                                        disabled={loading}
                                        error={errors.oldPassword && touched.oldPassword}
                                        helperText={touched.oldPassword && errors.oldPassword}
                                        sx={{
                                            m: 2
                                        }}
                                    />
                                    <Field
                                        component={TextField}
                                        id="password"
                                        type="password"
                                        placeholder="Enter Password..."
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
                                        placeholder="Enter confirmPassword..."
                                        label="Confirm Password"
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
                                        Submit
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
                    <Snackbar open={error.error} onClose={onClose} autoHideDuration={2000}>
                        <Alert severity="warning" sx={{ width: '100%' }}>
                            {error.message}
                        </Alert>
                    </Snackbar>
                </Box>
            ): (
                <Stack
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100vw',
                }}>
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
                            Change password successfully
                        </Typography>
                        <Typography
                            sx={{
                                mt: '3vh',
                            }}>
                            Hi {email}, your password has change successfully. You can go to <Link href="/login">LOGIN</Link> page 
                        </Typography>        
                    </Box>
                </Stack>
            )}
        
        </>
    )
}