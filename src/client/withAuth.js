import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      // store the values in state
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      axios.get('/api/checkToken')
        .then(res => {
          // 200 code means OK
          if (res.status === 200) {
            // setting the state of loading to false
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }


    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      // if redirect is called go to the login page. An example would
      // be when a user isnt loged in bt tries to edit or delete a player
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        // A common pattern in React is for a component to return multiple elements
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}
