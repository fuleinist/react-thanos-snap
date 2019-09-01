import React, { useRef } from 'react';
import { createCanvas } from './effect';

const SnapWrapper = ({children}) => {
  const node = this.myRef.current;
  useEffect(()=> {
    createCanvas(children);
  }, [])
  const transformedChildren = children;
  return transformedChildren;
}

export default SnapWrapper;