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

export const play = (url: string | undefined, ) => {
  const audio = new Audio(url);
  audio.play();

  // const wordPlayList = [
  //   `${url}/{word.audio}`,
  //   `${url}/{word.audioMeaning}`,
  //   `${url}/{word.audioExample}`
  // ];

  // audio.src = wordPlayList[0];

  // let index = 1;
  // audio.onended = function () {
  //   if (index < wordPlayList.length) {
  //     audio.src = wordPlayList[index];
  //     audio.play();
  //     index++;
  //   }
  // }

};
