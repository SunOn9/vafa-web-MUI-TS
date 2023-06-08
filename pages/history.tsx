import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Header from '@/components/Header'
import {Typography, Box, Stack, Paper, Backdrop, CircularProgress} from '@mui/material'
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_CHAT_BY_USER_ID } from './apollo-client/querries';
import Cookies from 'js-cookie';
import { Token } from 'graphql';

interface chat {
  _id : string,
  createdAt: string,
  question: string,
  answer: string  
}

export default function History(): React.JSX.Element {
  const [datas, setDatas] = useState<any>()
  const [isExist, setIsExist] = useState(false)
  const token = Cookies.get('token')
  const [loading, setLoading] = useState(false)
  const [getChat] = useLazyQuery(GET_CHAT_BY_USER_ID, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    fetchPolicy: "no-cache" 
  })

  const handleHistory = async () => {
    setLoading(true)
    if (!token){
      setIsExist(false)
    }
    else{
      setIsExist(true)
      const {data} = await getChat()
      setDatas(data.chat)
    }
    setLoading(false)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    handleHistory()
  }, []);

  return (
    <>
        <Header
          isLoged={true}
          inHistory={true}
        />
        <Box
          display='flex'
          justifyContent='center'
          alignContent='center'>
        {loading && (
          <CircularProgress
            size={50}
            sx={{
              position: 'absolute',
            }}
          />
        )}
        <Stack
          direction="column"
          component={Paper}
          sx={{
            width: '80vw',
            height: '90vh',
            overflow: 'auto'
          }}
        >
          
        {datas &&
            datas.map((data:chat) => (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                  >
                  <Typography
                    key={'req'+data._id}
                    sx={{
                      p: 1,
                      mr: 2,
                      mb: 1,
                      bgcolor: 'primary.main',
                      boxShadow: 2,
                      borderRadius: 2,
                      minWidth: '5vw',
                      maxWidth: '50vw',
                      textAlign: 'justify',
                      fontSize: 18,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    {data.question}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                  }}
                  >
                  <Typography 
                    key={'res'+data._id}
                    
                    sx={{
                      p: 1,
                      m: 2,
                      bgcolor: 'background.paper',
                      boxShadow: 2,
                      borderRadius: 2,
                      minWidth: '10vw',
                      maxWidth: '70vw',
                      textAlign: 'left',
                      fontSize: 18,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    {data.answer.split('\n').map(function(item) {
                      return (
                        <>
                          {item}
                          <br/>
                        </>
                      )
                    })}
                  </Typography>
                </Box>  
              </>
            ))}
        </Stack>
        
        <Backdrop
          sx={{ color: '#fff'}}
          open={!isExist}
        >
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 10,
              bgcolor: 'background.paper',
              boxShadow: 2,
              borderRadius: 2,
              minWidth: 300,
            }}>
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                fontSize: 20,
              }}>
              Please login before continuing
            </Typography>
            <Typography
              mt={5}
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
          </Stack>
        </Backdrop>
      </Box>
    </>
  )
}
