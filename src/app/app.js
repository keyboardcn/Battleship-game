import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BattleshipUI from './components/battleship.ui';
import HomeComponent from './battleShip/HomeComponent';
import InputValidate from './inputValidation/input.validate';
import RenderTextComponent from './textCount/render.text';
import './app.css';
function App() {
  const [showDD, setShowDD] = useState(false);
  const [showPlaceHolder, setShowPlaceHolder] = useState(false);
  return (
      <Router>
        <div className="app">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/input-validate">Input Validate</Link>
            <div
                className='dropdown-wrapper extra-div'
                onClick={() => setShowPlaceHolder(true)}
                onMouseLeave={() => setShowPlaceHolder(false)}>
              <a>Empty Drop</a>
              { showPlaceHolder &&
              (<ul className='dropdown' onMouseLeave={() => setShowPlaceHolder(false)}>
                <li>
                  <Link>test link 1</Link>
                </li>
                <li>
                  <Link>test link 2</Link>
                </li>
              </ul>)}             
            </div>
            
            <Link to="/battleship">Battleship Game</Link>
            <Link to="/render-text">Render Text</Link>
            
            <div className='dropdown-wrapper'
               id='breadth'
               onClick={() => {
                console.log('setDD', showDD)
                setShowDD(true)}}
               onMouseOver={() => setShowDD(true)} 
               onMouseLeave={() => setShowDD(false)} >
                <a>&#9781;</a>
            { showDD &&
            (<ul className='dropdown' onMouseLeave={() => setShowDD(false)}>
              <li>
                <Link to="/input-validate" onClick={() => setShowDD(false)}>Input Validate</Link>
              </li>
              <li>
                <Link to="/battleship" onClick={() => setShowDD(false)}>Battleship Game</Link>
              </li>
              <li>
                <Link to="/render-text" onClick={() => setShowDD(false)}>Render Text</Link>
              </li>
            </ul>)}
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/input-validate" element={<InputValidate />} />
            <Route path="/battleship" element={<BattleshipUI />} />
            <Route path="/render-text" element={<RenderTextComponent />} />
          </Routes>
        </div>
      </Router>
  )
}
export default App;

