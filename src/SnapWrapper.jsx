import React, { useRef, useEffect, useState } from 'react';
import { createCanvas } from './effect';
import SnapButton from './SnapButton';

function resolveAfterMs(delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, delay);
  });
}


const SnapWrapper = ({children, delay, resume}) => {
  const eleRef = useRef(null);
  const [ snap, setSnap ] = useState(false);
  useEffect(()=> {
    const create = async () => {
      if(eleRef && snap) {
        await resolveAfterMs(delay);
        console.log(`SNAP!`)
        createCanvas(eleRef.current);
        if(resume === "auto" || 1) {
          await resolveAfterMs(delay * 5);
          console.log(delay * 5)
          setSnap(false);
        }
      }
    } 
    create();
  }, [snap])
  const transformedChildren = <div ref={eleRef} style={{position: 'relative'}}>{children}</div>;
  return  <>
            {snap ? transformedChildren : children}
            <div><SnapButton onClick={() => setSnap(!snap) }/></div>
          </>;
}

export default SnapWrapper;