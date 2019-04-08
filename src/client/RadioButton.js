import React from 'react';

// Could be adjusted to take a prop containing the list of radio button options
class RadioButton extends React.Component {
  render() {
    return (
      <div className="field is-horizontal">
        <div className="field-vertical">
          <label className="label" style={{color:'white'}}>Sort by name?</label>
        </div>
        <div className="field-body">
          <div className="field is-narrow">
            <div className="control">
              <label className="radio" style={{color:'white'}}>
                <input type="radio" name="sort" value="yes" checked={this.props.checked === 'yes'} onChange={this.props.handleChange}/>
                yes
              </label>
              <label className="radio" style={{color:'white'}}>
                <input type="radio" name="sort" value="no" checked={this.props.checked === 'no'} onChange={this.props.handleChange}/>
                no
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RadioButton;
