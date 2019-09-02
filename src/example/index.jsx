import React from "react";
import ReactDOM from "react-dom";
import image from '../images.jpg';
import { SnapButton, SnapWrapper } from '../index';

const App = () => {
  return  <div>
            <SnapWrapper><img src={image} /></SnapWrapper>
            <div><SnapButton /></div>
          </div>;
};

ReactDOM.render(<App />, document.getElementById("index"));