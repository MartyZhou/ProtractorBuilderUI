import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Menu, { MenuItem } from 'material-ui/Menu';
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

        this.state = {
            name: props.step.name,
            value: props.step.value,
            selectedActionId: props.step.action,
            selectedLocatorId: props.step.locator,
            actionAnchorEl: undefined,
            locatorAnchorEl: undefined,
            openAction: false,
            openLocator: false
        }
    }

    handleClickActionListItem = event => {
        this.setState({ openAction: true, actionAnchorEl: event.currentTarget });
    };

    handleClickLocatorListItem = event => {
        this.setState({ openLocator: true, locatorAnchorEl: event.currentTarget });
    };

    handleActionRequestClose = () => {
        this.setState({ openAction: false });
    };

    handleLocatorRequestClose = () => {
        this.setState({ openLocator: false });
    };

    handleActionClick = (event, option) => {
        this.setState({ selectedActionId: option.id, openAction: false, selectedActionName: option.name });
    };

    handleLocatorClick = (event, option) => {
        this.setState({ selectedLocatorId: option.id, openLocator: false, selectedLocatorName: option.name });
    };

    render() {
        return (
            <div>
                <TextField
                    label="Name"
                    value={this.state.name}
                    onChange={event => this.setState({ name: event.target.value })}
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
                            primary={this.state.selectedActionName}
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
                            selected={option.id === this.state.selectedActionId}
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
                            primary={this.state.selectedLocatorName}
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
                            selected={option.id === this.state.selectedLocatorId}
                            onClick={event => this.handleLocatorClick(event, option)}
                        >
                            {option.name}
                        </MenuItem>
                    ))}
                </Menu>
                <TextField
                    label="Value"
                    value={this.state.value}
                    onChange={event => this.setState({ value: event.target.value })}
                />
            </div>
        );
    }
}


TestStep.propTypes = {
    step: PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
        name: PropTypes.string,
        action: PropTypes.number,
        locator: PropTypes.number
    }),
    actions: PropTypes.array,
    locators: PropTypes.array
};

export default withStyles(styles)(TestStep);