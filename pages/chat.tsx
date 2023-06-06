import React, { useEffect } from 'react'
import { useState } from 'react';
import Header from '@/components/Header'
import {Box, Typography, Stack, TextField, Paper, FormControl, Backdrop, CircularProgress} from '@mui/material'
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { CREATE_CHAT } from './apollo-client/mutations';
import Cookies from 'js-cookie';

interface chat {
  userId : string,
  question: string,
  answer: string  
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
  const usersID = Cookies.get('userId');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleId(), [usersID]);

  const handleId = () => {
    if (!usersID) {
      setCurrentId({id: '', isExist: false})
    }
    else {
      setCurrentId({id: usersID, isExist: true})  
    }
  }
  
  //get the answer from AI
  const getAnswer = async () =>{
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

  const [postChat] = useMutation(CREATE_CHAT)

  const handleSubmit = async (event : any) => {
    event.preventDefault()
    setLoading(true);
    const response = await getAnswer()

    if (response.ok){
      const result = await response.json()

      const chatCompletion : chat = {
        userId: currentId.id,
        question: question,
        answer: result.choices[0].message.content
      }
      setDatas([...datas, chatCompletion])
      setQuestion(" ")
      setLoading(false);

      const {data} = await postChat({variables: {
        input: {
          userIdField: chatCompletion.userId,
          questionField: chatCompletion.question,
          answerField: chatCompletion.answer
        }
      }})
    }
    else{
      throw new Error(response.statusText)
    }
  }

  return (
    <>
      <Header
        isLoged={true}
        inChat={true}
    />
      <Box
        display='flex'
        justifyContent='center'
      >
        <Stack
          direction="column"
          component={Paper}
          sx={{
            width: '80vw',
            height: '83vh',
            overflow: 'auto'
          }}
        >
            
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
                    key={'req'+data.userId}
                    sx={{
                      p: 1,
                      m: 2,
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
                    key={'res'+data.userId}
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
                    }}
                  >
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
            ))
          }
        </Stack>
      </Box>
      <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
      >
        <FormControl
          component="form" 
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'space-evenly',
            width: '100%',
            mb: 0,
            position: 'absolute',
            bottom: 0
          }}
        >
          <TextField
            sx = {{width: '80%'}}
            value={question}
            disabled={loading}
            onChange={(e) => setQuestion(e.target.value)}
            id="question"
            variant="filled"
            autoComplete='off'
            required/>
        </FormControl>
        {loading && (
          <CircularProgress
            size={50}
            sx={{
              position: 'absolute',
            }}
          />
        )}
      </Box>
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
            }}
          >
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
    </>
  )
}
