import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Header from '@/components/Header'
import {Typography, Box, Stack, Paper, Backdrop, CircularProgress} from '@mui/material'
import { useRouter } from 'next/router'

interface chat {
  userId : string,
  createdAt: string  ,
  question: string,
  answer: string  
}

export default function History(): React.JSX.Element {
  const [datas, setDatas] = useState<any>()
  const [isExist, setIsExist] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { query } = router

  useEffect(() => handleHistory(), []);

  const handleHistory = () =>{
    setLoading(true)
    if (datas === undefined){
      if (query.id === undefined){
        setIsExist(false)
      }
      else {
        setIsExist(true)
        getHistory()
      }
    }
  }
  const getHistory = async () => {
    
    const dataQuery = {
      userId: query.id 
    }
    
    const response = await fetch('/api/findHistoryById', {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify(dataQuery)
    })
    
    const data = await response.json();
    setDatas(data)
    setLoading(false)
  }
  return (
    <>
        <Header
          isLoged={true}
          inHistory={true}
          userId={query.id}/>
        <Box
        display='flex'
        justifyContent='center'
        alignContent='center'>
        {loading && (
            <CircularProgress
              size={200}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -12,
                marginLeft: -12,
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
          }}>
            
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
                        key={'req'+data.userId}
                        sx={{
                          p: 1,
                          mr: 2,
                          mb: 1,
                          bgcolor: 'primary.main',
                          boxShadow: 2,
                          borderRadius: 2,
                          minWidth: '5vw',
                          maxWidth: '30vw',
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
                        key={'res'+data.userId}
                        
                        sx={{
                          p: 1,
                          m: 2,
                          bgcolor: 'background.paper',
                          boxShadow: 2,
                          borderRadius: 2,
                          minWidth: '10vw',
                          maxWidth: '50vw',
                          textAlign: 'justify',
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
