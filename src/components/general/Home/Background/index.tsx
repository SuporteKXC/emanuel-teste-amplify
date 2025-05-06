import { BackgroundMain } from './styles';
import { useState } from 'react';

import Bg1 from 'assets/images/backgrounds/bg1.jpg';
import Bg2 from 'assets/images/backgrounds/bg2.jpg';
import Bg3 from 'assets/images/backgrounds/bg3.jpg';
import Bg4 from 'assets/images/backgrounds/bg4.jpg';
import Bg5 from 'assets/images/backgrounds/bg5.jpg';
import Bg6 from 'assets/images/backgrounds/bg6.jpg';
import Bg7 from 'assets/images/backgrounds/bg7.jpg';
import Bg8 from 'assets/images/backgrounds/bg8.jpg';
import Bg9 from 'assets/images/backgrounds/bg9.jpg';
import Bg10 from 'assets/images/backgrounds/bg10.jpg';
import Bg11 from 'assets/images/backgrounds/bg11.jpg';

const images = [Bg1, Bg2, Bg3, Bg4, Bg5, Bg6, Bg7, Bg8, Bg9, Bg10, Bg11]

export const BackgroundTransition = () => {
  const [classList, setClassList] = useState(['','','','','','','','','','','']);
  const [initial, setInitial] = useState('selected')
  const time = 10000;
  const max = images.length;
  let currentIndex = 0;

  const nextImage = () => {
    currentIndex++
    if(currentIndex >= max){
      currentIndex = 0;
    }
    setClassList(classList.map((element, index)=> index === currentIndex ? 'selected' : ''))
  }

  const start = () => {
    setInterval(()=>{nextImage()}, time);
    setTimeout(()=>{setInitial('none')}, 16000);
  }

  window.addEventListener('load', start)

  return(
    <>
      <BackgroundMain>
        <img src={Bg1} className={initial} alt=''/>
        <img src={images[0]} className={classList[0]} alt=''/>
        <img src={images[1]} className={classList[1]} alt=''/>
        <img src={images[2]} className={classList[2]} alt=''/>
        <img src={images[3]} className={classList[3]} alt=''/>
        <img src={images[4]} className={classList[4]} alt=''/>
        <img src={images[5]} className={classList[5]} alt=''/>
        <img src={images[6]} className={classList[6]} alt=''/>
        <img src={images[7]} className={classList[7]} alt=''/>
        <img src={images[8]} className={classList[8]} alt=''/>
        <img src={images[9]} className={classList[9]} alt=''/>
        <img src={images[10]} className={classList[10]} alt=''/>
      </BackgroundMain>
    </>
  )
}