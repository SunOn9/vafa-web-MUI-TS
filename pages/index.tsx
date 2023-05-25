import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Head from 'next/head'
import { Typography } from '@mui/material'
import Header from '../components/Header';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
      <Typography 
        variant='h1' 
        align='center' 
        m={5}
      >
        Welcome to VAFA
      </Typography>
      <Typography 
        variant='h2' 
        align='center' 
        mt={5}
      >
        Test Account:
      </Typography>
      <Typography 
        variant='h3' 
        align='center' 
        mt={5}
      >
        demo@demo
      </Typography>
      <Typography 
        variant='h3' 
        align='center' 
        mt={5}
      >
        123456789
      </Typography>
    </>
  )
}
