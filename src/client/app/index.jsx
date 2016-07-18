import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './components/awersome_component';

class App extends React.Component {
  render () {
    return <AwesomeComponent />;
  }
}

render(<App/>, document.getElementById('app'));
