/*
    Accepts OBJ data from JPL Horizons API
    and extracts position, velocity and RG (distance from coordinate center)
*/

export const extractData = (data) => {
    const position = {
        X: Number(data.result.match(/X\s*=\s*([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/)[1]),
        Y: Number(data.result.match(/Y\s*=\s*([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/)[1]),
        Z: Number(data.result.match(/Z\s*=\s*([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/)[1]),
    }

    const velocity = {
        VX: Number(data.result.match(/VX\s*=\s*([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/)[1]),
        VY: Number(data.result.match(/VY\s*=\s*([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/)[1]),
        VZ: Number(data.result.match(/VZ\s*=\s*([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/)[1]),
    }

    const RG = Number(data.result.match(/RG\s*=\s*([+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/)[1])

    return {
        position,
        velocity,
        RG
    }
}