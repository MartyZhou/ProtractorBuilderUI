import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import SaveIcon from 'material-ui-icons/Save';
import AddIcon from 'material-ui-icons/Add';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import TestCase from './testCase';

const styles = theme => ({
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
});

class TestSuite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            suite: props.suite,
            cases: props.cases,
            expanded: false
        }
    };

    // componentDidMount() {
    //     if (this.props.suite && this.props.suite.id) {
    //         this.props.protractorService.getSuite(this.props.suite.id).then(data => {
    //             this.setState({
    //                 cases: data.cases
    //             })
    //         });
    //     }
    // };

    componentWillReceiveProps(nextProps) {
        this.state = {
            suite: nextProps.suite,
            cases: nextProps.cases,
            caseIds: nextProps.cases.map(c => { return c.id }),
            expanded: false
        };
    }

    handleSuiteNameChanged = (event) => {
        let suite = Object.assign({}, this.state.suite);
        suite.name = event.target.value;

        this.setState({
            suite: suite
        })
    }

    handleSaveSuiteClick = () => {
        let suite = Object.assign({}, this.state.suite);
        suite.cases = this.state.caseIds.map(id => {
            return { id: id };
        })

        this.props.protractorService.putSuite(suite).then(data => {
            console.log(data);
        });
    };

    handleCaseIdChanged = (caseId) => {
        if (!this.state.caseIds.includes(caseId)) {
            this.setState(preState => ({
                caseIds: [...preState, caseId]
            }))
        }
    };

    handleNewCaseClick = () => {
        let testCase = {
            id: '"' + this.state.cases.length + '"',
            steps: []
        };

        this.setState(prevState => ({
            cases: [...prevState.cases, testCase]
        }))
    };

    render() {
        const classes = this.props.classes;
        const caseElements = this.state.cases.map(s => <TestCase
            key={s.id}
            testCase={s}
            protractorService={this.props.protractorService}
            onCaseIdChanged={this.handleCaseIdChanged}
        />);
        return (
            <div>
                <TextField
                    label="Suite Name"
                    value={this.state.suite.name}
                    onChange={this.handleSuiteNameChanged}
                />
                <IconButton aria-label="Save Suite">
                    <SaveIcon onClick={this.handleSaveSuiteClick} />
                </IconButton>
                <List>
                    {caseElements}
                    <IconButton aria-label="New Case">
                        <AddIcon onClick={this.handleNewCaseClick} />
                    </IconButton>
                </List>
            </div>
        );
    }
}

TestSuite.propTypes = {
    classes: PropTypes.object.isRequired,
    protractorService: PropTypes.shape({
        getSuite: PropTypes.func.isRequired,
        putSuite: PropTypes.func.isRequired
    }).isRequired,
    cases: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        enabled: PropTypes.bool
    })),
    suite: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        enabled: PropTypes.bool
    })
};

export default withStyles(styles)(TestSuite);