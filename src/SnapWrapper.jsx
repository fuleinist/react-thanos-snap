import React, { useRef, useEffect } from 'react';
import { createCanvas } from './effect';

const SnapWrapper = ({children}) => {
  const eleRef = useRef(null);
  useEffect( ()=> {
    const create = async () => {
      await setTimeout(()=>{}, 3000);
      if(eleRef) { createCanvas(eleRef.current); } else {console.log(`something is wrong ${eleRef}`)}
    } 
    create();
  }, [])
  const transformedChildren = <div ref={eleRef}>{children}</div>;
  return transformedChildren;
}

export default SnapWrapper;