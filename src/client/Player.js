import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Player extends React.Component {
  // Initialise the state in a constructor
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      lName:'',
      fName:'',
      position:'',
      teamName:'',
      foot:''
    };
    this.getPlayer();
  }

  getPlayer() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res=>{
        // console.log(res.data);
        this.setState(res.data);
      })
      .catch(err=> {
        console.log(err);
      });
  }

  /* Conditional Rendering to see if the player state has been changed in the componentDidMount*/
  render() {
    return (
      <div className="container">
        <div className="column">
          <img
            className="active-player-img"
            src={this.state.image}
            style={{width:'500px'}}
            alt={this.state.lName}
          />
          <h3 className="columns is-vcentered">
            {' '}
            <b>Name</b>: {this.state.fName}{' '}
            {this.state.lName}
          </h3>
          <h3 className="columns is-vcentered">
            {' '}
            <b>Age</b>: {this.state.age}
          </h3>
          <h3 className="columns is-vcentered">
            {' '}
            <b>Team</b>: {this.state.teamName}
          </h3>
          <h3 className="columns is-vcentered">
            {' '}
            <b>Position</b>: {this.state.position}
          </h3>
          <h3 className="columns is-vcentered">
            {' '}
            <b>Foot</b>: {this.state.foot}
          </h3>
          <h3 className="columns is-vcentered">
            {' '}
            <b>Place of Birth</b>: {this.state.nationality}
          </h3>
          <button className="button-is-rounded" className="button is-normal" className="go home">
            <Link to="/">Home Page</Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Player;
