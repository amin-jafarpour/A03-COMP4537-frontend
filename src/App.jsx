
import Main from './components/Main';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/Login';
// import Header from './components/Header';
import Signup from './components/Signup';
import LandIn from './components/LandIn'
import React, { useState } from "react";





function App() {



  // const [headers, setHeaders] = useState({login: false});
    return ( 
        // <div className = "App" >
        //     <Pokemon pokeInfo={pokeSample}/>
        // </div>

        // <Search/>

        <>
        {/* <Header/> */}
        <div>Link:{process.env.REACT_APP_API_LINK}</div>
        <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<LandIn/>}/>
      <Route exact path="/main" element={<Main/>}/>
      <Route exact path="/login" element={<Login />}/>
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="*" element={<h1>wrong route</h1>}/>
      </Routes>
        </BrowserRouter>

     
  
        </>
    );
}

export default App;