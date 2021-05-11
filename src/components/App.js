import React from 'react';
import Signup from './authentication/Signup';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Bookmarks from './bookmarks/Bookmarks';
import UserDashboard from './authentication/UserDashboard';
import Login from './authentication/Login';
import PrivateRoute from '../PrivateRoute';
import ForgotPassword from './authentication/ForgotPassword';
import UpdateProfile from './authentication/UpdateProfile';

function App() {
  return (
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={Bookmarks} />
              <PrivateRoute path="/dashboard" component={UserDashboard} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
            </Switch>
          </AuthProvider>
        </Router>
  );
}

export default App;
