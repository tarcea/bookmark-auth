import React, { useEffect, useState } from 'react';
import Signup from './Authentication/Signup';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Bookmarks from './Bookmarks/Bookmarks';
import UserDashboard from './Authentication/UserDashboard';
import Login from './Authentication/Login';
import PrivateRoute from '../PrivateRoute';
import ForgotPassword from './Authentication/ForgotPassword';
import UpdateProfile from './Authentication/UpdateProfile';
import Navbar from './Navbar/Navbar';

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth)
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
        <Router>
          <AuthProvider>
            <Navbar width={width}/>
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
