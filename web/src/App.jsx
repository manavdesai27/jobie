import React,{useState} from "react";

import Header from './components/Header/Header';
import List from './components/List/List';

import {dataCall} from './api/index';
import { useEffect } from "react";

function App() {
  const [Tweets, setTweets] = useState([]);
  useEffect(() => {
    const data = dataCall();
    setTweets(data);
  }, [])
  
  return (
    <div>
      <Header/>
      <br />
      <List Tweets={Tweets}/>
    </div>
  );
}

export default App;
