import React from 'react';
import {render} from 'react-dom';
import { configure, authStateReducer } from 'redux-auth';
import AwesomeComponent from './components/awersome_component';
import { EmailSignInForm } from "redux-auth/material-ui-theme"
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

let reducer = combineReducers({
	auth: authStateReducer,
})

const store = createStore(
    reducer
);

class App extends React.Component {
  render () {
    return <EmailSignInForm />;
  }
}

render(
	<Provider store={store} key="provider"><App/></Provider>, 
	document.getElementById('app'));
