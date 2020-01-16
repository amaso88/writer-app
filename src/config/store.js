import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import rootReducer from '../shared/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(  
		thunkMiddleware,
		promiseMiddleware, 
		loadingBarMiddleware(),	
	)
  // other store enhancers if any
);


export const store = createStore( rootReducer,  enhancer);