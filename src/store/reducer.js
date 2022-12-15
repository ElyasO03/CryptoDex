const initialState = {
    isAuthenticated: false, 
    watchListItems: []
}

const reducer = (state = initialState, action) => {

    if(action.type === 'ON_LOGIN') {
        return {
            ...state, 
            isAuthenticated: action.payload === null ? false: true 
        }
    } else if(action.type === 'ON_SIGNOUT') {
        return {
            ...state, 
            isAuthenticated: false 
        }
    } else if(action.type === 'ADD_TO_WATCHLIST') {
        return {
            ...state,
            watchListItems: state.watchListItems.concat(action.payload)
        }
    } else if(action.type === 'DELETE_COIN') {
        console.log(action.payload)
        return {
            ...state,
            watchListItems: state.watchListItems.filter(coin=> {
                console.log(coin.id)
                return coin.id != action.payload})
        }
    }

    return state 
}

export default reducer 