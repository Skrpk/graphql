import React, { Component } from 'react';

import AuthContext from '../context/auth-context';

import './Auth.css';

class AuthPage extends Component {
  state = {
    isLogin: true
  }

  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  submitHandler = (event) => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if(email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
        mutation {
          createUser(userInput: {email: "${email}", password: "${password}"}) {
            id
            email
          }
        }
      `
      };
    }

    fetch('http://localhost:4000/graphql', {
      method: 'post',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!', res);
        }

        return res.json();
      })
      .then(resBody => {
        if (resBody.data.login.token) {
          this.context.login(
            resBody.data.login.token,
            resBody.data.login.userId,
            resBody.data.login.expirationTime
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  switchModeHandler = () => {
    this.setState({ isLogin: !this.state.isLogin });
  }

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button type="submit">
            Submit
          </button>
          <button type="button" onClick={this.switchModeHandler}>
            Switch to { this.state.isLogin ? 'sign up' : 'login' }
          </button>
        </div>
      </form>
    );
  }
}

export default AuthPage;