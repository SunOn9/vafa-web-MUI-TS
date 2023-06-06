import {useQuery} from "@apollo/client"
import {useState, useEffect} from "react";
import {TextField, CircularProgress, Button, Stack, Box} from "@mui/material"
import { GET_USER_BY_EMAIL } from "./apollo-client/querries";
import { Formik, Field } from 'formik';

interface Errors {
    email: string;
}
interface InputValue {
    email: string;
}
export default function Test(){
    const [email, setEmail] = useState("")
    const [currentId, setCurrentId] = useState("")
    const [errors, setErrors] = useState<Errors>({
        email: ""
    })
    const [loginLoading, setLoginLoading] = useState(false)

    const {data, loading, error} = useQuery(GET_USER_BY_EMAIL, {
        variables: {
            email: email
        }
    })

    useEffect(() => {
        setLoginLoading(loading)
    },[loading])

    useEffect(() => {
        if(data && data.user){
            setCurrentId(data.user._id)
        }
    },[data])
    return (
        <div>
                
            <Formik
                 onSubmit={async data => {
                    setEmail(data.email)
                  }}
                  initialValues={{
                    email: "",
                    password: ""
                  }}
            >
                {({ handleSubmit , handleChange}) => (
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
                                <Field
                                    component={TextField}
                                    id="email"
                                    placeholder="Enter email address..."
                                    label="Email"
                                    variant="outlined"
                                    onChange={handleChange}
                                    disabled={loading}
                                    sx={{
                                    m: 2
                                    }}
                                />
                                <Field
                                    component={TextField}
                                    id="password"
                                    type="password"
                                    placeholder="Enter password..."
                                    label="Password"
                                    variant="outlined"
                                    onChange={handleChange}
                                    disabled={loading}
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
                                    Login
                                </Button>
                            </Stack>
                        </Box>
                    </form>
                )}
                
            </Formik>
            <p>
                  {currentId}  
            </p>
            {loading && (
                <CircularProgress
                    size={50}
                    sx={{
                        position: 'absolute',
                    }}
                />
            )}
            
        </div>
    );
}
