import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Login";
import Books from "./Books";
import BookDetail from "./BookDetail";
import NavBar from "./NavBar";

export default class App extends Component {
  state = {
    token: null,
  };

  handleLogin = (token) => {
    this.setState({ token });
    localStorage.setItem("token", token);
    this.router.history.push("/books");
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ token: null });
    this.router.history.push("/");
  };

  render() {
    return (
      <div>
        <Router ref={(router) => (this.router = router)}>
          <NavBar onLogout={this.handleLogout} />
          <div className="container">
            <Switch>
              <Route exact path="/books" component={Books} />
              <Route path="/books/:id" component={BookDetail} />
              <Route
                path="/"
                render={() => <Login onLogin={this.handleLogin} />}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
