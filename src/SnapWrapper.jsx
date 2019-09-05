import React, { useRef, useEffect } from 'react';
import { createCanvas } from './effect';

function resolveAfterMs(delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, delay);
  });
}


const SnapWrapper = ({children, snap, setSnap, delay, resume}) => {
  const eleRef = useRef(null);
  useEffect(()=> {
    const create = async () => {
      if(eleRef.current && eleRef.current.offsetWidth !== 0 && snap) {
        if (delay) {await resolveAfterMs(delay);}
        createCanvas(eleRef.current.childNodes[0]);
        if(resume === ("auto" || 1)) {
          await resolveAfterMs(delay * 5);
          console.log(delay * 5)
          if(setSnap) {setSnap(false);}
        }
      }
    } 
    create();
  }, [snap])
  const transformedChildren = <div ref={eleRef} style={{position: 'relative'}}>{children}</div>;
  return  <>
            {snap ? transformedChildren : children}
          </>;
}

export default SnapWrapper;