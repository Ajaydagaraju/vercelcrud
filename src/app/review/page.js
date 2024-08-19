import React from 'react'
import Review from './review'

const ReviwPage = () => {
  return (
    <div  style={{ margin:'0 auto', textAlign:'center' }} >
        <h1 style={{fontSize:'24px' }} >PostgreSQL Store</h1>
        <Review id={1} />
    </div>
  )
}

export default ReviwPage