import Header from "@/components/Header";
import { useMutation } from "@apollo/client";
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { Field, Formik } from "formik";
import { SEND_MAIL } from "./apollo-client/mutations";
import * as Yup from 'yup';
import { useState } from "react";
interface error {
    error: boolean;
    message: string;
}
export default function forgotPassword() {
    const [success, setSuccess] = useState(false)
    const [sendMail, {loading}] = useMutation(SEND_MAIL)
    const [error, setError] = useState<error>({
        error: false,
        message: ''
    })
    const handleSubmit = async (props : any) => {
        const {data} = await sendMail({ variables: {
            input: {
              email: props.email,
            }
          }}) 
        if(data && data.sendMailResetPassword) {
            setSuccess(true)
        } else {
            setError({
                error: true,
                message: 'This email has not been registered yet'
            })
        }
    }

    const regex = new RegExp("^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$")
    const Schema = Yup.object().shape({
        email: Yup.string()
          .required('Email required')
          .matches(regex, 'Invalid email'),

    })
    const onClose = () => {
        setError({
            error: false,
            message: ''
        })
    }
    return (
        <>
            <Header
                isLoged={false}
                />
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
                                email: ""
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
                                        <Typography>
                                            Enter email address <br/>
                                            Which you used to register
                                        </Typography>
                                        <Field
                                            component={TextField}
                                            id="email"
                                            placeholder="Enter email address..."
                                            label="Email"
                                            variant="outlined"
                                            onChange={handleChange}
                                            disabled={loading}
                                            error={errors.email && touched.email}
                                            helperText={touched.email && errors.email}
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
                    <Snackbar open={error.error} onClose={onClose} autoHideDuration={2000}>
                        <Alert severity="warning" sx={{ width: '100%' }}>
                            {error.message}
                        </Alert>
                    </Snackbar>
                </Box>
            ):(
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
                        spacing='4rem'
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
                            variant='h3'
                            sx={{
                                
                            }}>
                                SUCCESS !
                        </Typography>
                        <Typography
                            variant='h5'
                            sx={{
                                mt: '2vh',
                            }}>
                             Please check your email to reset password!
                        </Typography>
                    
                    </Stack>
                </Box>
            )}
            
        </>
    )
}
