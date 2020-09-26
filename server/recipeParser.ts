export const cleanupText = (raw: string): string[] => {
  return raw.split('\n').filter((item) => item.length > 0);
};
