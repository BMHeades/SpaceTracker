import { useState, useEffect } from 'react'
import { getHorizonsData } from './utils/horizons'


function App() {

  useEffect(()=>{

  const data = getHorizonsData()
   console.log(data)

  }, [])


  return (
    <>
      
    </>
  )
}

export default App
