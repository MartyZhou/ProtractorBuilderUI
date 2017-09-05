import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import TestSuiteList from './components/testSuiteList';

import { ProtractorService } from './services/protractorService';

class App extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     suites: []
  //   }
  // }

  // componentDidMount() {
  //   ProtractorService.getSuites().then(data => {
  //     this.setState({
  //       suites: data
  //     });
  //   });
  // }

  render() {

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography type="title">
              Protractor Builder UI
          </Typography>
          </Toolbar>
        </AppBar>
        <TestSuiteList protractorService={ProtractorService} />
      </div>
    );
  }
}

export default App;
