import React, { useState, useEffect } from "react";
import axios from 'axios'
import Coins from "./components/Coins";
import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Coin from './components/Coin'
import LoginUi from "./components/LoginUi";
import { Provider } from "react-redux";
import { createStore } from 'redux'
import reducer from './store/reducer'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


function App() {

  const [coins, setCoins] = useState([])



  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=9&page=1&sparkline=false').then((response) => {
      setCoins(response.data)
      //console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <>
      <Provider store={store}>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Coins coins={coins} />} />
        <Route path= '/login' element={<LoginUi />} />
        <Route path='/coin' element={<Coin />}>
          <Route path=':coinId' element={<Coin />} />
        </Route>
      </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
