import { getNowAndFuture } from "./time.js";

const time = getNowAndFuture();

export async function getHorizonsData(majorBodyID) {
    const params = new URLSearchParams({
        format: 'json',
        COMMAND: `'${majorBodyID}'`, // TESLA ROADSTER
        OBJ_DATA: 'NO',
        EPHEM_TYPE: 'VECTORS',
        START_TIME: `'${time.now}'`,
        STOP_TIME: `'${time.future}'`,
    }); 
    const url = `https://ssd.jpl.nasa.gov/api/horizons.api?${params}`;
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
    })
    return response.json()
}