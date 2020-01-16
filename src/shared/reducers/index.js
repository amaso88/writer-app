import { combineReducers } from 'redux';

import authentication from './authentication'
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';


const rootReducer = combineReducers({
	authentication,
	loadingBar
})

export default rootReducer;