import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../Reducer/userReducer';
import leaderBoardReducer from '../Reducer/leaderBoardReducer';

const configureStore=()=>{
    const store= createStore(combineReducers({
      userReducer,
      leaderBoardReducer
    }), applyMiddleware(thunk))
    return store;
}

export default configureStore