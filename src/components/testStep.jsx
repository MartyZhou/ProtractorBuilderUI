import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import ApplyIcon from 'material-ui-icons/Check';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    root: {
        width: '100%',
        background: theme.palette.background.paper,
    },
});

class TestStep extends Component {
    constructor(props) {
        super(props);

        let selectedAction = props.actions.find(a => a.id === props.step.actionSequence);
        let selectedLocator = props.locators.find(l => l.id === props.step.locator);
        let selectedResultFrom;
        if (props.step.resultFrom) {
            selectedResultFrom = props.previousSteps.find(s => s.name === props.step.resultFrom.name);
        }
        this.state = {
            step: props.step,
            name: props.step.name,
            value: props.step.value,
            selectedAction: selectedAction,
            selectedLocator: selectedLocator,
            selectedResultFrom: selectedResultFrom,
            actionAnchorEl: undefined,
            locatorAnchorEl: undefined,
            openAction: false,
            openLocator: false,
            openResultFrom: false,
            isChanged: false
        }
    }

    handleClickActionListItem = event => {
        this.setState({ openAction: true, actionAnchorEl: event.currentTarget });
    };

    handleClickLocatorListItem = event => {
        this.setState({ openLocator: true, locatorAnchorEl: event.currentTarget });
    };

    handleClickResultFromListItem = event => {
        this.setState({ openResultFrom: true, resultFromEl: event.currentTarget });
    };

    handleActionRequestClose = () => {
        this.setState({ openAction: false });
    };

    handleLocatorRequestClose = () => {
        this.setState({ openLocator: false });
    };

    handleResultFromRequestClose = () => {
        this.setState({ openResultFrom: false });
    };

    handleActionClick = (event, option) => {
        let step = Object.assign({}, this.state.step);
        step.actionSequence = option.id;

        this.setState({
            selectedAction: option,
            openAction: false,
            step: step,
            isChanged: true
        });
    };

    handleLocatorClick = (event, option) => {
        let step = Object.assign({}, this.state.step);
        step.locator = option.id;

        this.setState({
            selectedLocator: option,
            openLocator: false,
            step: step,
            isChanged: true
        });
    };

    handleResultFromClick = (event, option) => {
        let step = Object.assign({}, this.state.step);
        step.resultFrom = option;

        this.setState({
            selectedResultFrom: option,
            openResultFrom: false,
            step: step,
            isChanged: true
        });
    };

    handleApply = () => {
        this.props.onStepChanged(this.state.step);
        this.setState({
            isChanged: false
        });
    }

    handleDelete = (event) => {
        this.props.onStepDeleted(this.state.step);
    };

    handleStepNameChanged = (event) => {
        let step = Object.assign({}, this.state.step);
        step.name = event.target.value;
        this.setState({
            step: step,
            isChanged: true
        });
    };

    handleStepValueChanged = (event) => {
        let step = Object.assign({}, this.state.step);
        step.value = event.target.value;
        this.setState({
            step: step,
            isChanged: true
        });
    };

    render() {
        return (
            <div className="pb-step-row">
                <TextField
                    label="Name"
                    value={this.state.step.name}
                    onChange={this.handleStepNameChanged}
                />
                <List>
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="action-menu"
                        aria-label="Action"
                        onClick={this.handleClickActionListItem}
                    >
                        <ListItemText
                            primary={this.state.selectedAction.name}
                        />
                    </ListItem>
                </List>
                <Menu
                    id="action-menu"
                    anchorEl={this.state.actionAnchorEl}
                    open={this.state.openAction}
                    onRequestClose={this.handleActionRequestClose}
                >
                    {this.props.actions.map((option, index) => (
                        <MenuItem
                            key={option.id}
                            selected={option.id === this.state.selectedAction.id}
                            onClick={event => this.handleActionClick(event, option)}
                        >
                            {option.name}
                        </MenuItem>
                    ))}
                </Menu>
                <List>
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="locator-menu"
                        aria-label="Locator"
                        onClick={this.handleClickLocatorListItem}
                    >
                        <ListItemText
                            primary={this.state.selectedLocator.name}
                        />
                    </ListItem>
                </List>
                <Menu
                    id="locator-menu"
                    anchorEl={this.state.locatorAnchorEl}
                    open={this.state.openLocator}
                    onRequestClose={this.handleLocatorRequestClose}
                >
                    {this.props.locators.map((option, index) => (
                        <MenuItem
                            key={option.id}
                            selected={option.id === this.state.selectedLocator.id}
                            onClick={event => this.handleLocatorClick(event, option)}
                        >
                            {option.name}
                        </MenuItem>
                    ))}
                </Menu>
                <TextField
                    label="Value"
                    value={this.state.step.value ? this.state.step.value : ''}
                    onChange={this.handleStepValueChanged}
                />
                <List>
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="result-from-menu"
                        aria-label="ResultFrom"
                        onClick={this.handleClickResultFromListItem}
                    >
                        <ListItemText
                            primary={this.state.selectedResultFrom ? this.state.selectedResultFrom.name : ''}
                        />
                    </ListItem>
                </List>
                <Menu
                    id="result-from-menu"
                    anchorEl={this.state.resultFromEl}
                    open={this.state.openResultFrom}
                    onRequestClose={this.handleResultFromRequestClose}
                >
                    {this.props.previousSteps.map((option, index) => (
                        <MenuItem
                            key={option.name}
                            selected={option.name === (this.state.selectedResultFrom ? this.state.selectedResultFrom.name : '')}
                            onClick={event => this.handleResultFromClick(event, option)}
                        >
                            {option.name}
                        </MenuItem>
                    ))}
                </Menu>
                {this.state.isChanged ?
                    <IconButton aria-label="Apply">
                        <ApplyIcon onClick={this.handleApply} />
                    </IconButton> : <span />
                }
                <IconButton aria-label="Delete">
                    <DeleteIcon onClick={this.handleDelete} />
                </IconButton>
            </div>
        );
    }
}


TestStep.propTypes = {
    step: PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
        name: PropTypes.string,
        actionSequence: PropTypes.number,
        locator: PropTypes.number
    }),
    actions: PropTypes.array,
    locators: PropTypes.array,
    previousSteps: PropTypes.array,
    onStepDeleted: PropTypes.func,
    onStepChanged: PropTypes.func
};

export default withStyles(styles)(TestStep);