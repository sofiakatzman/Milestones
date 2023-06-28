import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Friends from "./Friends";
import Create from "./Create";
import Settings from "./Settings";
import './index.css'

function App() {
  return (
    <>
      <h1 className="title">milestones</h1>
      <div>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/settings" component={Settings} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;