import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

class LoginPage extends Component {
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { authenticate, isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to={from} />;
    }

    return (
      <blockquote className="blockquote text-center">
        <br/>
        <br/>
        <p className="mb-0">Usted ha sido redireccionado desde la URI "{from.pathname}"</p>
        <br/>
        <footer className="blockquote-footer">Para utilizar la aplicación es necesario <button className="btn btn-outline-success"  onClick={authenticate}>Iniciar sesión</button>
          <br/>
        </footer>
      </blockquote>
    );
  }
}

LoginPage.propTypes = {
  authenticate: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default LoginPage