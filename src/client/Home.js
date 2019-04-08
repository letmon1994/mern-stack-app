import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PlayerCard from './PlayerCard';
import axios from 'axios';
import DropDown from './DropDown';
import RadioButton from './RadioButton';
import Input from './Input';
import './app.css';

class Home extends Component {
  constructor(props) {
    super(props);
    // store the array of players values in state
    this.state = {
      filteredFootballers: [],
      genderSelected: 'all',
      nationalitySelected: 'all',
      nationalityValues: [],
      sort: 'no',
      searchText: '',
      players:[],
      unfilteredPlayers: []
    };

    this.handleChange = this.handleChange.bind(this);
    // this.updateUsers = this.updateUsers.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // when the component mounts, fetch the player data from the server
    axios.get('api/users')
      .then(data => {

        const players = data.data.map(player => {
          return {
            key: player._id,
            id: player._id,
            fName: player.fName,
            lName: player.lName,
            image: player.image,
            gender: player.gender,
            nationality: player.nationality,
            foot: player.foot,
            teamName: player.teamName,
            position: player.position,
            age: player.age
          };
        });
        this.setState({ players: players, filteredFootballers: players});

        // sort and remove duplicate nationalities
        // store the result in state to be used for the dropdown menu options
        const nationality = players.map(player => {
          return player.nationality;
        });
        const deduped = [...new Set(nationality)];
        deduped.sort();
        this.setState({ nationalityValues: deduped });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
    // handle both of the <select> UI elements
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(name);
    this.setState({
      [name]: value
    });

    // if results are to be sorted by calling my compareByName function
    let players = this.state.players;
    if(value === 'yes') {
      players.sort(this.compareByName);
    } else {
      this.getPlayers();
    }

  }

  getPlayers() {
    axios.get('api/users')
      .then(data => {

        const players = data.data.map(player => {
          return {
            key: player._id,
            id: player._id,
            fName: player.fName,
            lName: player.lName,
            image: player.image,
            gender: player.gender,
            nationality: player.nationality,
            foot: player.foot,
            teamName: player.teamName,
            position: player.position,
            age: player.age,
            redirect:false
          };
        });
        this.setState({ players: players, filteredFootballers: players});
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(userId) {
    // make a DELETE request to the server to remove the player with this Id
    if (localStorage.getItem('loggedIn') === 'false') {
      this.setState({redirect:true});
    } else {
      axios
        .delete('api/users', {
          data: {
            id: userId
          }
        })
        .then(response => {
          // if delete was successful, re-fetch the list of users, will trigger a re-render
          this.getPlayers();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  // function to campare the list of players to be sorted by last name
  compareByName(a,b) {
    if (a.lName < b.lName)
      return -1;
    if (a.lName > b.lName)
      return 1;
    return 0;
  }
  render() {
    // to redirect to the log in page when required
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    const players = this.state.players;

    console.log(this.state.players);

    // Generate unique player cards for each player
    // Each card needs a unique key, for the i am using id
    // Check the state of the inputs and skip cards not matching the
    // required gender & Citizenship & search text
    // for each player object, produce a player Component
    const playerList = players.map(player => {
      const genderMatch =
        this.state.genderSelected === player.gender ||
        this.state.genderSelected === 'all';
      const natMatch =
        this.state.nationalitySelected === player.nationality ||
        this.state.nationalitySelected === 'all';
      // const nameMatch = player.lName.toLowerCase().startsWith(this.state.searchText.toLowerCase());
      const nameMatch = player.lName.toLowerCase().indexOf(this.state.searchText.toLowerCase()) >= 0;
      return genderMatch && natMatch && nameMatch ? (
        <PlayerCard
          key={Math.random()}
          id={player.id}
          name={player.lName}
          gender={player.gender}
          image={player.image}
          nationality={player.nationality}
          foot={player.foot}
          fName={player.fName}
          position={player.position}
          age={player.age}
          teamName={player.teamName}
          handleDelete={this.handleDelete}
        />
      ) : null;
    });

    return (
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column is-7">
              <Input
                name="searchText"
                label="Search by name"
                value={this.state.searchText}
                handleChange={this.handleChange}
                placeholder={'Search by entering players surname'}
              />
            </div>

            <div className="column is-vcentered">
              <DropDown
                options={['all', 'Male', 'Female']}
                name="genderSelected"
                handleChange={this.handleChange}
                label="Gender"
                selected={this.state.genderSelected}
              />

              <DropDown
                options={['all'].concat(this.state.nationalityValues)}
                name="nationalitySelected"
                handleChange={this.handleChange}
                label=" Citizenship"
                selected={this.state.nationalitySelected}
              />

              <RadioButton
                handleChange={this.handleChange}
                checked={this.state.sort}
                name='sort'
              />
            </div>
          </div>
          <div className="columns is-multiline">{playerList}</div>
        </div>
      </section>
    );
  }
}

export default Home;
