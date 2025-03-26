
/**
 * Formats seconds into mm:ss format
 */
export const formatTimeFromSeconds = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * Converts minutes to seconds
 */
export const minutesToSeconds = (minutes: number): number => {
  return minutes * 60;
};

/**
 * Converts seconds to minutes (rounded)
 */
export const secondsToMinutes = (seconds: number): number => {
  return Math.round(seconds / 60);
};
