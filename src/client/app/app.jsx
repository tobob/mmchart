import React from "react";
import {Provider} from "react-redux";
import {Route, IndexRoute} from "react-router";
import { configure, authStateReducer } from 'redux-auth';
import {createStore, compose, applyMiddleware} from "redux";
import {Router, createMemoryHistory, browserHistory} from "react-router";
import { routerReducer, syncHistoryWithStore } from "react-router-redux";
import requestsReducer from "./reducers/requests_reducer";
import {combineReducers} from "redux";
import thunk from "redux-thunk";
import Container from "./views/partials/container";
import Main from "./views/main";
import SignIn from "./views/sign_in";
import SignUp from "./views/sign_up";
import Account from "./views/account";
import GlobalComponents from "./views/partials/global_components";

class App extends React.Component {
  render() {
    return (
      <Container>
        <GlobalComponents />
        {this.props.children}
      </Container>
    );
  }
}

function requireAuth (store, nextState, replace, next) {
  if (!store.getState().auth.getIn(["user", "isSignedIn"])) {
    replace("/login");
  }
  next();
}

export function initialize({cookies, isServer, currentLocation, userAgent} = {}) {
  console.log("koko");
  console.log(requestsReducer);
  console.log(routerReducer);
  console.log(authStateReducer);
  const reducer = combineReducers({
    auth: authStateReducer,
    routing: routerReducer,
    requests: requestsReducer
  });

  // create the redux store
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk)
    )
  );

  let history = (isServer)
    ? createMemoryHistory(currentLocation)
    : browserHistory;

  history = syncHistoryWithStore(history, store);

  // define app routes
  var routes = (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Main} />
        <Route path="login" component={SignIn} />
        <Route path="registration" component={SignUp} />
        <Route
          path="account"
          component={Account}
          onEnter={requireAuth.bind(this, store)} />
      </Route>
    </Router>
  );

  /**
   * The React Router 1.0 routes for both the server and the client.
   */
  const __API_URL__ = "http://localhost:8080/api"

  return store.dispatch(configure([
    {
      default: {
        apiUrl: __API_URL__,
        emailSignInPath:       "/authenticate",
        emailRegistrationPath: "/registration",
        signOutPath:           "/logout",
      }
    }
  ], {
    cookies,
    isServer,
    currentLocation
  })).then(({redirectPath, blank} = {}) => {
    // hack for material-ui server-side rendering.
    // see https://github.com/callemall/material-ui/pull/2007
    if (userAgent) {
      global.navigator = {userAgent};
    }

    return ({
      blank,
      store,
      history,
      routes,
      redirectPath,
      provider: (
        <Provider store={store} key="provider" children={routes} />
      )
    });
  });
}