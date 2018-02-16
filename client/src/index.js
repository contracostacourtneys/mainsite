import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import cookie from 'react-cookie';
import AppRouter from './router';
import rootReducer from './reducers/index';
import dataService from './services/data-service'
import promise from 'redux-promise'
//import todoApp from './reducers' //rootReducer
//import App from './components/App' //appRouter


// import ReactGA from 'react-ga';

import { AUTH_USER } from './actions/types';
// import { FETCH_USER } from './actions/types';

// Import stylesheets
import './public/stylesheets/app.scss';

// *** Initialize Google Analytics ***
// ReactGA.initialize('UA-000000-01');

// function logPageView() {
//   ReactGA.pageview(window.location.pathname);
// }

//grabe preloaded state from global var injected into server-generated html
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

console.log("preloadedState: ", preloadedState);

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// <<<<<<< HEAD
// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(rootReducer, preloadedState, devTools);
// const store = createStore(
// 	rootReducer,
// 	preloadedState,
// 	applyMiddleware(reduxThunk, devTools)
// 	);
const createStoreWithMiddleware = applyMiddleware(reduxThunk, promise)(createStore);
const store = createStoreWithMiddleware(rootReducer, devTools);

store.subscribe(() => {
  console.log('state changed', store.getState());
});

const token = cookie.load('token');

if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({
    type: AUTH_USER,
  });
}

// experiment with theme-change
// const themes = [];

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root'),
);

// store.dispatch({type: 'GET_TODO_DATA'})

// / add to < Router onUpdate={logPageView} /> for google analytics
