import React, { useState, useEffect } from "react";
import { getAllBooks, loginUser, logoutUser } from "../apiServices/authService";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setAccessToken } from "../redux/accessTokenSlice";
export default function UserProfileHomeComponent() {
  const [email, setEmail] = useState<string>("jane.smith@example.com");
  const [password, setPassword] = useState<string>("password123");
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.accessToken.accessToken);
  const handleLogin = () => {
    console.log(`Logging in with email: ${email} and password: ${password}`);
    loginUser(email, password)
      .then((response) => {
        console.log("Login successful:", response,response.data);
        dispatch(setAccessToken({ accessToken: response.data.accessToken }));
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };
  const handleLogout = () => {
    console.log("Logging out");
    logoutUser()
      .then((response) => {
        console.log("Logout successful:", response.data);
       dispatch(setAccessToken({ accessToken: null }));

      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const handleGetAllBooks = async () => {
    const books = await getAllBooks();
    console.log("Fetched books:", books);
  };

  useEffect(() => {  
    if (accessToken) {
        console.log("Current Access Token:", accessToken);
    }
  }, [accessToken]);

  return (
    <div className="container-wrapper">
      <h2>User Profile Home</h2>
      <div className="input-wrapper">
        <div className="input-box">
          <label htmlFor="email">Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            name="email"
            placeholder="email"
          />
        </div>
        <div className="input-box">
          <label htmlFor="password">Username:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />
        </div>
        <div className="input-box">
        <button onClick={() => handleLogin()} style={{ display: 'block', width: '100%' }}>Login</button>
        <button onClick={() => handleLogout()} style={{ display: 'block', width: '100%' }}>Logout</button>
        </div>
      </div>

      <div className="input-wrapper">
        <button 
        style={{ display: 'block', width: '100%' }}
        onClick={() => handleGetAllBooks()}>Get All Books</button>
      </div>
    </div>
  );
}
