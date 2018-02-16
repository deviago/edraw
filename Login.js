import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { fetchUserFromAPI, getCurrentUserFromApi } from '../../actions/UserAuthAction';
import { validateEmail, validatePassword } from '../../helper';
import Loader from '../../components/Loader';

import LogoImage from '../../assets/images/logo.png';
import "./login.css";

class Login extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillMount(){
      const { email, password } = this.state;
      this.props.getUser(email, password);
  }

  handleLogin = (event) => {
    const { email, password } = this.state;

    event.preventDefault();
    
    if(!validateEmail(email)) {
      alert("Invalid email");
      return;
    }

    if(!validatePassword(password)) {
      alert("Invalid password");
      return;
    }

    this.props.signInUser(email, password);
  };

  render() {
    const { error, isFetching, loggedIn } = this.props.userReducer;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5 loginMain" style={{ float: "none", margin: "0 auto" }}>
            <div className="loginscreen">
              <img src={LogoImage} alt='Logo' width="300" />
            </div>
            <div className="loginscreen">
              <form className="card-block" onSubmit={this.handleLogin}>
                <div className="input-group">
                  <input
                    type="text"
                    ref="username"
                    className="form-control"
                    placeholder="Email"
                    onChange={(event) => this.setState({ email: event.target.value })}
                    required
                    autoFocus
                  />
                </div>

                <div className="input-group">
                  <input
                    type="password"
                    ref="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(event) => this.setState({ password: event.target.value })}
                    required
                  />
                </div>


                {(error) && (
                  <div className="alert alert-danger">
                    The login credentials provided were incorrect
                  </div>
                )}

                <button
                  className="btn btn-block loginbutton"
                >
                  Log in
                </button>
                <Link to="/register" className="btn btn-link">Register</Link>
              </form>
            </div>
            {isFetching && (
              <Loader />
            )}

            {loggedIn && (
              <Redirect to={{
                pathname: '/dashboard',
              }}/>
            )}

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    userReducer: state.userReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    signInUser: (email, password) => dispatch(fetchUserFromAPI(email, password)),
    getUser: () => dispatch(getCurrentUserFromApi())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
