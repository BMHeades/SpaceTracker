import { useState, useEffect } from 'react'
import { socket } from './utils/socket'
import { ElapsedTime } from './components/ElapsedTime';

import { Gauge } from "../components/thegridcn/gauge"
import { StatusBar } from "../components/thegridcn/status-bar"
import { StatCard } from "../components/thegridcn/stat-card"
import { Card, CardContent } from "../components/ui/card"
import { Separator } from "../components/ui/separator"

interface Data{
  headers: {
    active: number
  }
  coordinates: {
    position: {
      X: number
      Y: number
      Z: number
    }
    velocity: {
      VX: number
      VY: number
      VZ: number
    }
    RG: number
  }
}

function App() {

  const [RG, setRG] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {

    const newHorizonsHandler = (data: Data) => {

      setRG(data.coordinates.RG * 0.62137 - 3959)
      setVelocity(Math.sqrt(data.coordinates.velocity.VX ** 2 + data.coordinates.velocity.VY ** 2 + data.coordinates.velocity.VZ ** 2) * 2232)
      setActiveCount(data.headers.active)

    }

    socket.on("newHorizons", newHorizonsHandler)

    return () => {
      socket.off("newHorizons", newHorizonsHandler)
    }
  }, [])


  return (
    <>
      <StatusBar leftContent={`SERVER: ${activeCount > 0 ? "ONLINE" : "OFFLINE"}`} rightContent={'ACTIVE: ' + activeCount} />
      <div className='p-5'>

        <div className='grid-container'>

          <Card style={{ gridArea: "image" }} className=" p-0 overflow-hidden" >
            <img
              src="src/assets/starman.jpg"
              alt="starman floating in space"
              className="w-full h-full object-cover object-center filter grayscale opacity-75"
            />
          </Card>

          <Card style={{ gridArea: "box-1" }}>

            <ElapsedTime />


          </Card>

          <StatCard title='DISTANCE FROM EARTH' value={RG} unit='MILES' />
          <Card style={{ gridArea: "box-3" }}>
            
            <Gauge value={velocity} min={0} max={100000} unit='MPH' size='lg' variant='danger'/>
            </Card>

          <Card style={{ gridArea: "text" }}>
            

            <CardContent className="font-mono">
              <h2>BACKGROUND</h2>
              <br />
              <p>Dummy payload from the first launch of SpaceX Falcon Heavy launch vehicle. Consists of a standard Tesla Roadster automobile and a spacesuit-wearing mannequin nicknamed "Starman".</p>
              <br />
              <p>Also includes a Hot Wheels toy model Roadster on the car's dash with a mini-Starman inside. A data storage device placed inside the car contains a copy of Isaac Asimov's "Foundation" novels. A plaque on the attachment fitting between the Falcon Heavy upper stage and the Tesla is etched with the names of more than 6,000 SpaceX employees.</p>
              <br />
              <p>After orbiting the Earth for 5 hours, a third burn by the second stage was completed at approximately 02:30 UTC Feb 7 2018, placing the dummy payload in a heliocentric orbit having a perihelion of 0.99 au and aphelion ~1.67 au.</p>
            </CardContent>
          </Card>
        </div>


      </div>

      <Separator />
      <footer className = "font-mono p-3 flex justify-between items-center text-foreground/80"> 
        <p>DATA FROM JPN HORIZONS</p> 
       <p >© 2026 meo studios</p>
      </footer>
    </>
  )
}

export default App
