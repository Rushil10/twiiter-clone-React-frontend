import React from 'react';
import './App.css';
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import {Provider} from 'react-redux'
import store from './redux/store'
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser,getUserData} from './redux/actions/userActions'

import home from './pages/home';
import signup from './pages/signup';
import login from './pages/login';
import user from './pages/user';
import Navbar from './components/Navbar';
import themefile from './util/theme';
import AuthRoute from './util/AuthRoute';
import axios from 'axios';

const theme = createMuiTheme(themefile);

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token)
  console.log(decodedToken)
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href='/login'
  } else {
    store.dispatch({type:SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
    <Provider store={store}>
    <div className="App">
      <Router>
      <Navbar />
      <div className="container">
      <Switch>
        <Route exact path="/" component={home}/>
        <AuthRoute
         exact path="/login" component={login}/>
        <AuthRoute
         exact path="/signup" component={signup}/>
         <Route exact path="/users/:handle" component={user} />
      </Switch>
      </div>
      </Router>
    </div>
    </Provider>
    </MuiThemeProvider>
  )
}

export default App;
