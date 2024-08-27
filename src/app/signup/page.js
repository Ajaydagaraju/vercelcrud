import React from 'react'
import SignUp from './signup'
import { Suspense } from 'react';
const SignIn = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div style={{ margin:'0 auto', textAlign:'center' }} >
    <h1 style={{fontSize:'24px' }} >Add your Details</h1>
        <SignUp/>
    </div>
    </Suspense>
  )
}

export default SignIn