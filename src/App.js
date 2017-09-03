import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import TestSuite from './components/testSuite';

import { ProtractorService } from './services/protractorService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suites: []
    }
  }

  componentDidMount() {
    ProtractorService.getSuites().then(data => {
      this.setState({
        suites: data
      });
    });
  }

  render() {
    const suiteElements = this.state.suites.map(s => <TestSuite key={s.id} suite={s} />);
    return (
      <div className="App">
        {suiteElements}
      </div>
    );
  }
}

export default App;
