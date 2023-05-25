import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { Box, Stack, Typography } from '@mui/material'
import Header from '../components/Header';
import React, { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  useEffect(() =>{
    handleAlreadyLogin();
  },[])

  const handleAlreadyLogin = () => {
    if (localStorage.getItem('userId')) {
      window.location.href = '/chat';
    }
  }
  return (
    <>
      <Head>
        <title>VAFA</title>
        <meta name="description" content="Generated by create next app to demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        isLoged={false}
        inHome={true}/>
      <Stack
        direction='row'
        minHeight='89vh'
        display='flex'
        alignItems='center'
        justifyContent='space-around'
        sx = {{
          backgroundColor:'#193718'
        }}
        >
        <Box
          display=''
          maxWidth='50vw'
          sx={{
            
          }}>
          <Typography
            variant='h2'
            color='#FF8BFF'
            sx={{
              mb:4,
              fontWeight: 'bold'
            }}>
              Introducing <br/> VAFA
          </Typography>
          <Typography
            variant='h5'
            textAlign='justify'
            color='#FF8BFF'>
              We’ve trained a model called VAFA which interacts in a conversational way. The dialogue format makes it possible for VAFA to answer followup questions, admit its mistakes, challenge incorrect premises, and reject inappropriate requests.
          </Typography>
        </Box>
        <Box
          maxWidth='50vw'
          
          sx={{

          }}>
          <img src="https://images.openai.com/blob/8d14e8f0-e267-4b8b-a9f2-a79120808f5a/chatgpt.jpg?trim=0,0,0,0&width=500" alt="" />
        </Box>
      </Stack>
    </>
  )
}
