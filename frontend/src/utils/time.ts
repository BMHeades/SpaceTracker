export const roadsterLaunchTime = '2018-02-06 20:45:00';

export const timeSince = (date: string | Date) => {
  const past = new Date(date).getTime();
  const now = Date.now();

  const diff = now - past;

  if (isNaN(past)) {
    throw new Error("Invalid date");
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);

  return {
    days,
    hours: hours,
    minutes: minutes % 60,
    seconds: seconds % 60
  }
}