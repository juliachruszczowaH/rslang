

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
  const audio = new Audio(sounds[0]);
  // eslint-disable-next-line prefer-const
  if (sounds.length > 0) {
    audio.currentTime = 0;
    audio.play();
    sounds.shift();
    audio.addEventListener('ended', function () {
      return play(sounds);
    });

  }
};
export function disabledBtn(){
  const BUTTONS_AUDIO_BOOK: NodeListOf<Element> = document.querySelectorAll('.button--audio');
  const BUTTONS_AUDIO_GAME: NodeListOf<Element> = document.querySelectorAll('.button__game--audio');
  for (const btn of BUTTONS_AUDIO_BOOK as any){
    btn.setAttribute('disabled', 'disabled');
    setTimeout(()=>{
      btn.removeAttribute('disabled', 'disabled');
    }, 9000);
  }
  for (const btn of BUTTONS_AUDIO_GAME as any){
    btn.setAttribute('disabled', 'disabled');
    setTimeout(()=>{
      btn.removeAttribute('disabled', 'disabled');
    }, 1000);
  }

}

export const getStorageData = (key: string): string | null => {
  const data = localStorage.getItem(key);
  if (data) {
    return data;
  }
  return null;
};

