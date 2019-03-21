import React, {Component} from'react';
import axios from 'axios';

class TranslationHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            translationHistory: null,
        };
    }

    async componentDidMount() {
        const translationHistory = (await axios.get('http://localhost:8083/')).data;
        this.setState({
            translationHistory,
        });
    }

    updateDelID(value) {
        this.setState({
          delid: value,
        });
      }
    
    async delete() {
        this.setState({
            disabled: true,
        });

        await axios.post('http://localhost:8083/delete', {
            delid: this.state.delid,
        });

        this.props.history.push('/');
    }

    render() {
        return (
          <div>
              <br/><br/>
          <table>
              <br/>
              <th>Translation History</th>
              <tr>
                  <th> ID</th>
                  <th>English</th>
                  <th>Morse Code</th>
              </tr>
              
              {this.state.translationHistory === null && <p>Loading history...</p>}
              
              {
                this.state.translationHistory && this.state.translationHistory.map(t => (
                    <tr>
                        
                        <td>
                            <div >
                                <input size='2'
                                    disabled={this.state.disabled}
                                    type="text"
                                    value = {t.id}
                                    onBlur={(e) => {this.updateDelID(e.target.value)}}
                                />
                            </div>
                        </td>
                        <td>{t.en}</td>
                        <td>{t.morse}</td>
                        
                    </tr>
                ))
              }
                <td><button
                    disabled={this.state.disabled}
                    onClick={() => {this.delete()}}>
                    Delete
                </button></td>
              </table>
            </div>
        )
    }
}

export default TranslationHistory;