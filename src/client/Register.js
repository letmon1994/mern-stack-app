import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
  constructor(props) {
    super(props);
    // store the values form fields in state
    this.state = {
      email : '',
      password: ''
    };

    // binds the functions to be used
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    event.preventDefault();
    axios.post('/api/register', this.state)
      .then(res => {
        // 200 code means OK
        if (res.status === 200) {
          // if registration is successful then redirect to / (home)
          this.props.history.push('/');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error registering in please try again');
      });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <h3>Register Below</h3>
          <div className="column is-6">
            <label className="label" style={{color:'white'}}>Email</label>
            <div className="control">
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />
            </div>
          </div>
          <div className="column is-6">
            <label className="label" style={{color:'white'}}>Password</label>
            <div className="control">
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
            </div>
          </div>
          <b1><input className="button-is-rounded" className="button is-normal" type="submit" value="Submit" /></b1>
        </form>
      </div>
    );
  }
}
