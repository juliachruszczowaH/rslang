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

export const play = (sounds: string[]) => {
  if (sounds.length > 0) {
    const audio = new Audio(sounds[0]);
    audio.currentTime = 0;
    audio.play();
    sounds.shift();
    audio.addEventListener('ended', function () {
      return play(sounds);
    });
  }

};

export const getStorageData = (key: string): string | null => {
  const data = localStorage.getItem(key);
  if (data) {
    return data;
  }
  return null;
};
