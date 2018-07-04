import React, { Component } from 'react';
import { withRouter, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom'
import AuthButton from './components/AuthButton'
import PrivateRoute from './components/PrivateRoute'
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import SearchPage from './components/SearchPage'
import PlacePage from './components/PlacePage'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      places: []
    };
  }

  authenticate = () => {
    this.setState({ isAuthenticated: true });
  };

  signout = () => {
    const { history } = this.props;
    this.setState({ isAuthenticated: false });
    history.push("/");
  };

  handleOnAddPlace = ({ name, lat, lng, address }) => {
    const { places } = this.state;

    if (!places.find((place) => place.name === name)) {
      places.push({ name, lat, lng, address });

      this.setState({ places })
    }
  };

  handleOnRemovePlace = ({ name }) => {
    const { places } = this.state;
    const index = places.map(place => place.name).indexOf(name);
    if (index > -1) {
      places.splice(index, 1);
      this.setState({ places })
    }
  };

  render() {
    const { isAuthenticated, places } = this.state;

    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">React clase 8</Link>
          {isAuthenticated && (
          <div className="navbar-nav mr-auto mt-2 mt-lg-0">
            <NavLink className="nav-item nav-link" to="/places">Mis Lugares {' '}
              {!!places.length && <span
              className="badge badge-pill badge-danger">{ places.length }</span>}</NavLink>
            <NavLink className="nav-item nav-link" to="/search">Buscador</NavLink>
          </div>
          )}
          <form className="form-inline my-2 my-lg-0">
            <AuthButton isAuthenticated={isAuthenticated} onSignedOut={this.signout} />
          </form>
        </nav>
        <br/>
        <Switch>
          <Route path="/login" component={(props) => <LoginPage authenticate={this.authenticate} isAuthenticated={isAuthenticated} {...props} />} />
          <Route exact path="/" component={() => <Redirect to="/places"/>} />
          <PrivateRoute isAuthenticated={isAuthenticated} path="/places/:name" component={(props) => <PlacePage places={places} onRemovePlace={this.handleOnRemovePlace} {...props} />} />
          <PrivateRoute isAuthenticated={isAuthenticated} path="/places" component={(props) => <HomePage places={places} onRemovePlace={this.handleOnRemovePlace} {...props}/>} />
          <PrivateRoute isAuthenticated={isAuthenticated} path="/search" component={(props) => <SearchPage onAddPlace={this.handleOnAddPlace} {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
