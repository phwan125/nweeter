import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";


const AppRouter = ({ refreshUser, checkLogin, userObj }) => {
  console.log("checklogin : ", checkLogin)
  return <Router>
    {checkLogin && <Navigation userObj={userObj} />}
    <Switch>
      {checkLogin ?
        <>
          <Route exact path="/">
            <Home userObj={userObj} />
          </Route>
          <Route exact path="/profile">
            <Profile userObj={userObj} refreshUser={refreshUser} />
          </Route>
        </> :
        <Route exact path="/">
          <Auth />
        </Route>
      }
    </Switch>

  </Router>
}

export default AppRouter