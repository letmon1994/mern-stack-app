import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

// Component to represent a single player 'Card'
// note that the edit button navigates to a new URL (which will load a new Component via React Router)
// whereas the delete button invokes a function in the parent Component
class PlayerCard extends React.Component {

  // define what happens when this componet gets drawn on the UI
  render() {
    return (
      <div className="column is-3">
        <div className="card" >
          <div className="card-image">
            <figure className="image is-4by3">
              <img alt="Profile" src={this.props.image} />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{this.props.name}</p>
              </div>
            </div>
            <div className="media">
              <div className="media-content">
                {this.props.teamName ? <div className="title is-4">Team: <span className='subtitle is-6'>{this.props.teamName}</span></div> : null}
                {this.props.position ? <div className="title is-4">Position: <span className='subtitle is-6'>{this.props.position}</span></div> : null}
              </div>
            </div>
          </div>
          <footer className="card-footer">
            <button className="card-footer-item">
              <Link to={{ pathname: `/player/${this.props.id}`, player: this.props}}>See Players Information</Link>
            </button>
            <button className="card-footer-item">
              <Link to={`/edit-user/${this.props.id}`}>Edit</Link>
            </button>
            <button className="card-footer-item" type="button" onClick={() => {this.props.handleDelete(this.props.id);}}>
              Delete
            </button>
          </footer>
        </div>
      </div>
    );
  }
}
export default PlayerCard;
