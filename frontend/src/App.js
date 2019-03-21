import React, { Component } from 'react';
import TranslationHistory from './TranslationHistory/TranslationHistory';
import NewTranslation from './NewTranslation/NewTranslation';
class App extends Component {
  render() {
    return (
      <div>
        <strong>Morse Code Translator</strong>
        <NewTranslation/>
        <TranslationHistory/>
        <br/><br/>
        <p>---> Hit refresh after clicking Translate/Delete</p>
        <p>---> To delete click on the ID followed by the Delete button</p>
      </div>
    );
  }
}

export default App;
