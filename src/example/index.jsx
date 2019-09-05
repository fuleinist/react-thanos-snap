import React, { useState } from "react";
import ReactDOM from "react-dom";
import { SnapWrapper, SnapButton } from '../index';

const App = () => {
  const [snap, setSnap] = useState(false);
  return  <div className="content">
            <SnapWrapper snap={snap} setSnap={setSnap}><img src="https://filmschoolrejects.com/wp-content/uploads/2019/08/commentary-avengers-endgame.jpg" /></SnapWrapper>
            <SnapButton onClick={() => setSnap(!snap) }/>
          </div>;
};

ReactDOM.render(<App />, document.getElementById("index"));