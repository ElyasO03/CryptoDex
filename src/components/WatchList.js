import React from 'react'
import { connect } from 'react-redux'
import './Coins.css'
import { Link } from 'react-router-dom'
import Coin from './Coin'


const WatchList = (props) => {

const handleDelete= (id) => {
    console.log(id)
    props.handleDelete(id)
    // window.location.reload(false)
} 

    return (
        <div className='container'>
            <div>
                <div className='heading'>
                    <p>#</p>
                    <p className='coin-name'>Coin</p>
                    <p>Price</p>
                    <p>24h</p>
                    <p className='hide-mobile'>volume</p>
                    <p className='hide-mobile'>Market Cap</p>
                </div>

                {props.coins.map(coins => {
                    console.log(coins)
                    console.log(coins.market_data.current_price.usd)
                    return (
                        <>
                        <button onClick={()=> handleDelete(coins.id)}>Delete</button>
                        <Link to={`/coin/${coins.id}`} element={<Coin />} key={coins.id}>
                            <div className='coin-row'>
                                <p>{coins.market_cap_rank}</p>
                                <div className='img-symbol'>
                                    <img src={coins.image.small} alt='' />
                                    <p>{coins.symbol.toUpperCase()}</p>
                                </div>
                                <p>${coins.market_data.current_price.usd.toLocaleString()}</p>
                                <p>{coins.market_data.price_change_percentage_24h.toFixed(2)}%</p>
                                <p className='hide-mobile'>${coins.market_data.total_volume.usd.toLocaleString()}</p>
                                <p className='hide-mobile'>${coins.market_data.market_cap.usd.toLocaleString()}</p>
                            </div>
                        </Link>
                        </>
                    )
                })}

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        coins: state.watchListItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleDelete: (id) => dispatch({type: 'DELETE_COIN', payload: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchList) 