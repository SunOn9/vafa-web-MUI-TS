import React from 'react'

import Form from '../components/Form'
import Header from '../components/Header';

export default function login() {
  return (
    <div>
      <Header
        isLoged={false}
        inLogin={true}/>
      <Form isSigned={true}/>
    </div>
  )
}
