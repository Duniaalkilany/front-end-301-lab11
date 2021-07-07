
import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Login from './Login';
import Footer from './Footer';
import Profile from './Profile';
import BestBooks from './BestBooks'
import { withAuth0 } from '@auth0/auth0-react';


import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

 
  render() {
    const { user, isAuthenticated } = this.props.auth0;
    
    return(
      <>
        <Router>
          {/* <IsLoadingAndError> */}
            <Header isAuthenticated={isAuthenticated} />
            <Switch>
            <Route exact path="/">{isAuthenticated ? <BestBooks /> : <Login />}
              </Route>
              <Route exact path="/profile">{isAuthenticated ? <Profile userInfo={user} /> : ''} 
              </Route>
      
            </Switch>
            <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    );
  }
}

export default withAuth0(App);