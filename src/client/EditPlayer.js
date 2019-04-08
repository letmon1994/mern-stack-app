import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditPlayer extends Component {
  constructor(props) {
    super(props);
    // store information relating to the player in state
    this.state = {_id: '', fName: '', lName: '', image: '', gender: '', age: '', nationality: '', foot: '', position: '', teamName: ''};

    // binds the functions to be used
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // when this Component mounts, fetch data relating to the player to be edited
    // the players's ID is passed in via the URL and accessed via props
    axios.get('/api/users/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          _id: response.data._id,
          fName: response.data.fName,
          lName: response.data.lName,
          gender: response.data.gender,
          age: response.data.age,
          foot: response.data.foot,
          position: response.data.position,
          teamName: response.data.teamName,
          nationality: response.data.nationality,
          image: response.data.image,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // sends a PUT request to the server
    // the request includes the state, which is the updated user information
    axios.put('/api/users', this.state)
      .then(res => this.props.history.push('/')) // if successful go to home
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h3>Edit User</h3>
          <div className="column is-6">
            <label className="label" style={{color:'white'}}>First Name:</label>
            <div className="control">
              <input type="text" name="fName" className="input" value={this.state.fName} onChange={this.handleChange} />
            </div>
          </div>
          <div className="column is-6">
            <label className="label" style={{color:'white'}}>Last Name:</label>
            <div className="control">
              <input type="text" name="lName" className="input" value={this.state.lName} onChange={this.handleChange} />
            </div>
          </div>
          <div className="column is-6">
            <label className="label" style={{color:'white'}}>Team Name:</label>
            <div className="control">
              <input type="text" name="teamName" className="input" value={this.state.teamName} onChange={this.handleChange} />
            </div>
          </div>
          <div className="column is-6">
            <label className="label" style={{color:'white'}}>Position:</label>
            <div className="control">
              <input type="text" name="position" className="input" value={this.state.position} onChange={this.handleChange} />
            </div>
          </div>
          <div className="column is-6">
            <label className="label" style={{color:'white'}}>Nationality:</label>
            <div className="control">
              <input type="text" name="nationality" className="input" value={this.state.nationality} onChange={this.handleChange} />
            </div>
          </div>
          <div className="column is-6">
            <label className="label" style={{color:'white'}}>Age:</label>
            <div className="control">
              <input type="text" name="age" className="input" value={this.state.age} onChange={this.handleChange} />
            </div>
          </div>
          <div className="column is-8">
            <label className="label" style={{color:'white'}}>Gender:</label>
            <div className="control">
              <label className="form-check-label" style={{color:'white'}}>Male</label>
              <input type="radio" name="gender" className="form-check-input" value= "Male" checked={this.state.gender === 'Male'} onChange={this.handleChange} />
            </div>
            <div className="control">
              <label className="form-check form-check-inline" style={{color:'white'}}>Female</label>
              <input type="radio" name="gender" className="form-check-input" value="Female" checked={this.state.gender === 'Female'} onChange={this.handleChange} />
            </div>
          </div>
          <div className="column is-8">
            <label className="label" style={{color:'white'}}>Preferred Foot:</label>
            <div className="control">
              <label className="form-check-label" style={{color:'white'}}>Left</label>
              <input type="radio" name="foot" className="form-check-input" value= "Left" checked={this.state.foot === 'Left'} onChange={this.handleChange} />
            </div>
            <div className="control">
              <label className="form-check form-check-inline" style={{color:'white'}}>Right</label>
              <input type="radio" name="foot" className="form-check-input" value="Right" checked={this.state.foot === 'Right'} onChange={this.handleChange} />
            </div>
          </div>
          <div className="column is-6">
            <label className="label" style={{color:'white'}}>Image:</label>
            <div className="control">
              <input type="text" name="image" className="input" value={this.state.image} onChange={this.handleChange} />
            </div>
          </div>
          <b1><input className="button-is-rounded" className="button is-normal" type="submit" value="Submit" /></b1>
        </form>
      </div>
    );
  }
}

export default EditPlayer;
