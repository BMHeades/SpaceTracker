export const getUTCText = (now) => {
    const timeArray = now.toISOString().split('T')
    return timeArray[0] + " " + timeArray[1].split('.')[0]
}

const getNow = () => {
    return new Date();
}

const getFuture = (timeInFuture) => {
    const now = new Date();
    return new Date(now.getTime() + timeInFuture);
}

export const getNowAndFuture = (interval = 10000) => {
    return {
        now: getUTCText(getNow()),
        future: getUTCText(getFuture(interval))
    }
}
