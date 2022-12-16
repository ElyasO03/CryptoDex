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
import RegisterUi from "./components/RegisterUi";
import WatchList from "./components/WatchList";
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

let persistor = persistStore(store)


function App() {

  const [coins, setCoins] = useState([])



  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false').then((response) => {
      setCoins(response.data)
      //console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor} >
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Coins coins={coins} />} />
              <Route path='/login' element={<LoginUi />} />
              <Route path="/register" element={<RegisterUi />} />
              <Route path="/watchlist" element={<WatchList />} />
              <Route path='/coin' element={<Coin />}>
                <Route path=':coinId' element={<Coin />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
