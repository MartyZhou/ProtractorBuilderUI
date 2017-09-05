import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import SendIcon from 'material-ui-icons/Send';
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
            open: false
        }
    };

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    render() {
        const stepElements = this.props.testCase.steps.map(s => <TestStep key={s.id} step={s} />);
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
                </Collapse>
            </div>
        );
    }
}


TestCase.propTypes = {
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