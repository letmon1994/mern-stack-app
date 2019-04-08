import React from 'react';

class Input extends React.Component {
  render() {
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label" style={{color:'white'}}>{this.props.label}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control is-4">
              <input name={this.props.name} value={this.props.value} onChange={this.props.handleChange} className="input" type="text" placeholder={this.props.placeholder} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Input;
