import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'

import store from './store'
import routes from './routes'

// initialize firebase
import firebase from 'firebase'
/*STAGE CONFIG*/
const fbconfig = {
    apiKey: "AIzaSyBuxqd56LzPir8sWbYC06uk2jf-Yn_4R-M",
    authDomain: "goose-platform.firebaseapp.com",
    databaseURL: "https://goose-platform.firebaseio.com",
    storageBucket: "goose-platform.appspot.com",
    messagingSenderId: "1086707450695"
}
/*PRODUCTION CONFIG
const fbconfig = {
}*/
firebase.initializeApp(fbconfig)

// create redux store and apply middleware
let reduxStore = createStore(store, applyMiddleware(thunk))

// render applications in place of #app-entry in index.html
const app = document.getElementById('app-entry')
ReactDOM.render(
    <Provider store={reduxStore}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
)