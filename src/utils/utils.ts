// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const shuffleArray = (array: any[]) => {
  return array
    .map((i) => [Math.random(), i])
    .sort()
    .map((i) => i[1]);
};
export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * max);
};
