import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class NewTranslation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      en: '',
    };
  }

  updateEnText(value) {
    this.setState({
      en: value,
    });
  }

  async submit() {
    this.setState({
      disabled: true,
    });

    await axios.post('http://localhost:8083', {
      en: this.state.en,
    });

    this.props.history.push('/');
  }

  render() {
    return (
                <div>
                    <br/>
                  <label htmlFor="exampleInputEmail1">Enter text below:</label>
                  <br/><br/>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {this.updateEnText(e.target.value)}}
                  />
                  <br/><br/>
                <button
                  disabled={this.state.disabled}
                  onClick={() => {this.submit()}}>
                  Translate
                </button>
                </div>
    )
  }
}

export default withRouter(NewTranslation);