import { useState, useEffect } from 'react'
import { socket } from './utils/socket'

function App() {

  const [RG, setRG] = useState();

  useEffect(()=>{



    socket.on("newHorizons", data => {
      setRG(data.RG)
    })

  }, [])


  return (
    <>
      <h1>Distance from earth {RG} km</h1>
    </>
  )
}

export default App
