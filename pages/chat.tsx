import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import Header from '@/components/Header'
import { Typography, Stack, TextField, Paper, FormControl} from '@mui/material'


interface chat {
  id : string,
  createAt: number,
  req: string,
  res: string
}

interface PostPageQuery extends ParsedUrlQuery {
  id: string;
  slug?: string;
}

export default function Chat(): React.JSX.Element {
  const [question , setQuestion] = useState('')
  const [datas, setDatas] = useState<any>([])
  const [currentId, setCurrentId] = useState('')

  const router = useRouter()
  const query = router.query as PostPageQuery;

  useEffect(() => setCurrentId(query.id), [query.id]);

  //get the answer from AI
  const getAnwer = async (question  : string) =>{
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

  const handleSubmit = async (event : any) => {
    event.preventDefault()
    
    const response = await getAnwer(question)

    if (response.ok){
      const result = await response.json()

      const chatCompletion = {
        id: currentId,
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
          
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          component={Paper}
          spacing={1}
          sx={{
            
          }}>
            {datas.length > 0 &&
                datas.map((data:chat) => (
                  <>
                    <Typography
                      key={'req'+data.id}
                      sx={{
                        p:2
                      }}>
                      {data.req}
                    </Typography>
                    <Typography 
                      key={'res'+data.id}
                      sx={{
                        p: 2
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
                  </>
                ))}
        </Stack>
        <FormControl
          component="form" 
          onSubmit={handleSubmit}>
          <TextField
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            id="question"
            variant="filled"
            autoComplete='off'/>
        </FormControl>

    </>
  )
}
