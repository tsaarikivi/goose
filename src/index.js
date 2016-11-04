import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'

import routes from './routes'
import store from './store'

// create redux store and apply middleware
let reduxStore = createStore(store, applyMiddleware(thunk))

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

// set firebase auth eventlistener
// this function could be outside in a separate component
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("logged in as:", user)
        // we could send a reduxStore.dispatch() here
        // or call an action to fetch user data from db
        // this should at least lead to a state change
    } else {
        console.log("logged out")
    }
})

// render applications in place of #app-entry in index.html
ReactDOM.render(
    <Provider store={reduxStore}>
        <Router history={hashHistory} routes={routes} />
    </Provider>,
    document.getElementById('app-entry')
)