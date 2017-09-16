import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import SendIcon from 'material-ui-icons/Send';
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import TextField from 'material-ui/TextField';

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
            name: props.testCase.name,
            open: false,
            steps: props.testCase.steps
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

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    handleNewStepClick = () => {
        let step = {
            id: this.state.steps.length,
            actionSequence: 0,
            locator: 0
        };
        this.setState(prevState => ({
            steps: [...prevState.steps, step]
        }))
    };

    handleStepDeleted = (deletedStep) => {
        this.setState(prevState => ({
            steps: prevState.steps.filter(s => s.id !== deletedStep.id)
        }))
    };

    render() {
        const stepElements = this.state.steps.map((s, i) => <TestStep
            key={s.id}
            step={s}
            previousSteps={this.state.steps.slice(0, i)}
            actions={this.state.actions}
            locators={this.state.locators}
            onStepDeleted={this.handleStepDeleted}
        />);
        return (
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={this.state.name} />
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
        getLocators: PropTypes.func.isRequired
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
    })
};

export default withStyles(styles)(TestCase);