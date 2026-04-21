import { roadsterLaunchTime, timeSince } from "../utils/time";
import { useState, useEffect } from 'react';

import { Timer } from "../../components/thegridcn/timer"



export const ElapsedTime = () => {

    const [elapsed, setElapsed] = useState(timeSince(roadsterLaunchTime))


    useEffect(() => {
        const interval = setInterval(()=>{
            setElapsed(timeSince(roadsterLaunchTime))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
             {/* <p>{elapsed.days}:{elapsed.hours}:{elapsed.minutes}:{elapsed.seconds}</p> */}
             <Timer hours={elapsed.hours} minutes={elapsed.minutes} seconds={elapsed.seconds} label="" size="sm" variant="elapsed" />
        </>
    )
}