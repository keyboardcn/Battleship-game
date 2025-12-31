import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BattleshipUI from './components/battleship.ui';
import BattleshipHomeComponent from './battleShip/BattleshipHomeComponent';
import InputValidate from './inputValidation/input.validate';
import RenderTextComponent from './textCount/render.text';
import UserProfileHomeComponent from './userProfile/userProfileHomeComponent';
import BookHomeComponent from './booksList/book.home.component';

import './app.css';
function App() {
  const [showDD, setShowDD] = useState(false);
  const [showPlaceHolder, setShowPlaceHolder] = useState(false);
  return (
      <Router>
        <div className="app">
          <nav>
            <Link to="/">Home</Link>
            <div
                className='dropdown-wrapper extra-div'
                onClick={() => setShowPlaceHolder(true)}
                >
              <a>Users & Books</a>
              { showPlaceHolder &&
              (<ul className='dropdown' onMouseEnter={() => setShowPlaceHolder(true)} onMouseLeave={() => setShowPlaceHolder(false)}>
                <li>
                  <Link to="/user-profile">User Profile</Link>
                </li>
                <li>
                  <Link to="/show-books">Show Books</Link>
                </li>
                <li>
                  <Link to="/input-validate">Input Validate</Link>

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
                <Link to="/user-profile" onClick={() => setShowDD(false)}>User Profile</Link>
              </li>
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
            <Route path="/" element={<BattleshipHomeComponent />} />
            <Route path="/user-profile" element={<UserProfileHomeComponent />} />
            <Route path="/input-validate" element={<InputValidate />} />
            <Route path="/battleship" element={<BattleshipUI />} />
            <Route path="/render-text" element={<RenderTextComponent />} />
            <Route path="/show-books" element={<BookHomeComponent />} />
          </Routes>
        </div>
      </Router>
  )
}
export default App;

