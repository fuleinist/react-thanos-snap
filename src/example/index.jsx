import React from "react";
import ReactDOM from "react-dom";
import image from './image.png';
import { SnapWrapper } from '../index';

const App = () => {
  return  <div className="content">
            <SnapWrapper delay={1000} resume="auto" ><img src={image} /></SnapWrapper>
          </div>;
};

ReactDOM.render(<App />, document.getElementById("index"));