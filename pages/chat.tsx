import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header'
import {Box, Typography, Stack, TextField, Paper, FormControl, Backdrop} from '@mui/material'
import Link from 'next/link';



interface chat {
  id : string,
  createAt: number,
  req: string,
  res: string
}

interface currentId {
  id: any;
  isExist : boolean;
}

export default function Chat(): React.JSX.Element {
  const [question , setQuestion] = useState('')
  const [datas, setDatas] = useState<any>([])
  const [currentId, setCurrentId] = useState<currentId>({
    id: '',
    isExist: false
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { query } = router
  
  useEffect(() => handleId(), []);

  const handleId = () => {
    if (query.id === undefined){
      setCurrentId({
        id: '',
        isExist: false
      })
    }
    else {
      setCurrentId({
        id: query.id,
        isExist: true
      })
    }
  }
  //get the answer from AI
  const getAnwer = async () =>{
    const endpoint = 'https://api.pawan.krd/v1/chat/completions';
    const data = {
      model: "gpt-3.5-turbo",
      max_tokens: 3800,
      messages: [
        {
            role: "user",
            content: question,
        },
      ],
    };
    const options = {
        method: 'POST',
        headers: {
        'Authorization': "Bearer pk-tvCyIlXThuxlWPDsqwOJYTxLSQevKkXCrEANoIongjRdXbWh",
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    
    const response = await fetch(endpoint, options)
    return response
  }
  const saveData = async () => {

  }

  const handleSubmit = async (event : any) => {
    event.preventDefault()
    
    const response = await getAnwer()

    if (response.ok){
      const result = await response.json()

      const chatCompletion = {
        id: currentId.id,
        createdAt: result.created,
        req: question,
        res: result.choices[0].message.content
      }
      setDatas([...datas, chatCompletion])
      setQuestion(" ")
    }
    else{
      throw new Error(response.statusText)
    }
  }

  return (
    <>
      <Header
        isLoged={true}
        inChat={true}/>
      <Box
        display='flex'
        justifyContent='center'>
        <Stack
          direction="column"
          component={Paper}
          sx={{
            width: '80vw',
            height: '81vh',
            overflow: 'auto'
          }}>
            
            {datas.length > 0 &&
                datas.map((data:chat) => (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                      >
                      <Typography
                        key={'req'+data.id}
                        sx={{
                          p: 1,
                          m: 2,
                          bgcolor: '#D65A31',
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
                        {data.req}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                      >
                      <Typography 
                        key={'res'+data.id}
                        
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
                        {data.res.split('\n').map(function(item) {
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
      </Box>
      
      <FormControl
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent:'space-evenly',
          width: '100%',
          mb: 1,
          position: 'absolute',
          bottom: 0
        }}>
        <TextField
          sx = {{width: '80%'}}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          id="question"
          variant="filled"
          autoComplete='off'/>
      </FormControl>
      <Backdrop
        sx={{ color: '#fff'}}
        open={!currentId.isExist}
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
            }}
          >
              LOGIN
          </Typography>
          
        </Stack>
      </Backdrop>
    </>
  )
}
