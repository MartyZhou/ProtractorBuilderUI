import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logo from './logo.svg';
import './App.css';

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';
import SendIcon from 'material-ui-icons/Send';
import TestSuite from './components/testSuite';
import TestSuiteList from './components/testSuiteList';
import Switch from 'material-ui/Switch';

import { ProtractorService } from './services/protractorService';

const drawerWidth = 340;

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: 'auto',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  content: {
    width: '100%',
    marginLeft: -drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
    },
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

class App extends Component {
  state = {
    open: false,
    cases: [],
    selectedSuite: {},
    headerless: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleSuiteSelected = (suite) => {
    if (suite.isNew) {
      this.setState({
        cases: []
      });
    } else {
      ProtractorService.getSuite(suite.id).then(data => {
        if (data && data.cases) {
          this.setState({
            cases: data.cases.sort((a, b) => a.order - b.order)
          });
        }
      });
    }

    this.setState({ selectedSuite: suite });
  };

  handleRunClick = () => {
    ProtractorService.run(this.state.headerless).then(data => {
      console.log(data);
    });
  };

  handleHeaderLessChange = (event, checked) => {
    //this.setState({ headerless: checked });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                Protractor Builder UI
              </Typography>

              <IconButton color="contrast" aria-label="Run" className={classes.menuButton}>
                <SendIcon onClick={this.handleRunClick}/>
              </IconButton>
              <Switch
                checked={this.state.headerless}
                onChange={this.handleHeaderLessChange()}
                aria-label="Headerless"
              />
            </Toolbar>
          </AppBar>
          <Drawer
            type="persistent"
            classes={{
              paper: classes.drawerPaper,
            }}
            open={this.state.open}
          >
            <div className={classes.drawerInner}>
              <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <TestSuiteList protractorService={ProtractorService} onSuiteSelected={this.handleSuiteSelected} />
            </div>
          </Drawer>
          <main className={classNames(classes.content, this.state.open && classes.contentShift)}>
            <TestSuite suite={this.state.selectedSuite} cases={this.state.cases} protractorService={ProtractorService} />
          </main>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
