import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import axios from 'axios';
import CreatePlayer from './CreatePlayer';
import EditPlayer from './EditPlayer';
import Player from './Player';


class App extends Component {
  constructor() {
    super();
    this.state = {loggedIn: this.getLoginStatus()};
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  logout(props) {
    axios.get('api/logout')
      .then(res => {
        this.setState({loggedIn: false});
        localStorage.setItem('loggedIn', 'false');
        props.history.push('/');
      })
      .catch( err => console.log(err));
    return null;
  }

  login() {
    this.setState({loggedIn: true});
    localStorage.setItem('loggedIn', 'true');
  }

  getLoginStatus() {
    if(localStorage.getItem('loggedIn') === 'true') {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div>
        <h1>Football Players</h1>
        <ul className="header">
          <li><Link to="/">Home</Link></li>
          {this.state.loggedIn && <li><Link to="/create-player">Create A Players Profile</Link></li>}
          {!this.state.loggedIn && <li><Link to="/login">Login</Link></li>}
          {!this.state.loggedIn && <li><Link to="/register">Register</Link></li>}
          {this.state.loggedIn && <li><Link to="/logout">Logout</Link></li>}
        </ul>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/player/:id" component={Player}/>
          <Route path="/edit-user/:id" component={withAuth(EditPlayer)}/>
          <Route path="/create-player" component={withAuth(CreatePlayer)}/>
          <Route path="/login" render={(props) => <Login {...props} handleLogin={this.login} />} />
          <Route path="/logout" render={this.logout}/>
        </Switch>
      </div>
    );
  }
}

export default App;
