import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import SendIcon from 'material-ui-icons/Send';
import AddIcon from 'material-ui-icons/Add';
import SaveIcon from 'material-ui-icons/Save';
import IconButton from 'material-ui/IconButton';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';

import TestStep from './testStep';

const styles = theme => ({
    root: {
        width: '100%',
        background: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class TestCase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            testCase: props.testCase,
            name: props.testCase.name,
            open: false,
            steps: props.testCase.steps,
            actions: [],
            locators: []
        }
    };

    componentDidMount() {
        this.props.protractorService.getActions().then(data => {
            this.setState({
                actions: data
            })
        });

        this.props.protractorService.getLocators().then(data => {
            this.setState({
                locators: data
            })
        });
    };

    handleCaseNameChanged = (event) => {
        let testCase = Object.assign({}, this.state.testCase);
        testCase.name = event.target.value;

        this.setState({
            testCase: testCase
        })
    }

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    handleNewStepClick = () => {
        let step = {
            id: '"' + this.state.steps.length + '"',
            actionSequence: 0,
            locator: 0,
            order: this.state.steps.length > 0 ? this.state.steps[this.state.steps.length - 1].order + 1 : 0
        };
        this.setState(prevState => ({
            steps: [...prevState.steps, step]
        }))
    };

    handleStepDeleted = (deletedStep) => {
        this.setState(prevState => ({
            steps: prevState.steps.filter(s => s.id !== deletedStep.id)
        }));
    };

    handleStepChanged = (changedStep) => {
        this.setState(prevState => ({
            steps: prevState.steps.map(s => {
                if (s.id === changedStep.id) {
                    return changedStep;
                } else {
                    return s;
                }
            })
        }))
    };

    handleSaveCaseClick = () => {
        let testCase = Object.assign({}, this.state.testCase);
        testCase.steps = this.state.steps;

        this.props.protractorService.putCase(testCase).then(data => {
            this.props.onCaseIdChanged(data);
        });
    };

    render() {
        const stepElements = this.state.steps.map((s, i) => <TestStep
            key={s.id}
            step={s}
            previousSteps={this.state.steps.slice(0, i)}
            actions={this.state.actions}
            locators={this.state.locators}
            onStepDeleted={this.handleStepDeleted}
            onStepChanged={this.handleStepChanged}
        />);
        return (
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <TextField
                        label="Name"
                        value={this.state.testCase.name}
                        onChange={this.handleCaseNameChanged}
                    />
                    <IconButton aria-label="Save Case">
                        <SaveIcon onClick={this.handleSaveCaseClick} />
                    </IconButton>
                    {this.state.open ? <ExpandMore onClick={this.handleClick} /> : <ExpandLess onClick={this.handleClick} />}
                </ListItem>
                <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
                    {stepElements}
                    <IconButton aria-label="New Step">
                        <AddIcon onClick={this.handleNewStepClick} />
                    </IconButton>
                </Collapse>
            </div>
        );
    }
}


TestCase.propTypes = {
    protractorService: PropTypes.shape({
        getActions: PropTypes.func.isRequired,
        getLocators: PropTypes.func.isRequired,
        putCase: PropTypes.func.isRequired
    }).isRequired,
    classes: PropTypes.object.isRequired,
    testCase: PropTypes.shape({
        name: PropTypes.string,
        enabled: PropTypes.bool,
        steps: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            value: PropTypes.string,
            name: PropTypes.string,
            action: PropTypes.number,
            locator: PropTypes.number
        }))
    }),
    onCaseIdChanged: PropTypes.func.isRequired
};

export default withStyles(styles)(TestCase);