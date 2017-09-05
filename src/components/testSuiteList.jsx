import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import List, {
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import FolderIcon from 'material-ui-icons/Folder';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        background: theme.palette.background.paper,
    },
    title: {
        margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
    },
});

class TestSuiteList extends Component {
    state = {
        suites: []
    };

    componentDidMount() {
        this.props.protractorService.getSuites().then(data => {
            this.setState({
                suites: data
            });
        });
    }

    render() {
        const suiteElements = this.state.suites.map(s =>
            <ListItem button key={s.id}>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={s.name}
                />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );

        return (
            <div>
                <List>
                    {suiteElements}
                </List>
            </div>
        );
    }
}

TestSuiteList.propTypes = {
    classes: PropTypes.object.isRequired,
    protractorService: PropTypes.shape({
        getSuites: PropTypes.func.isRequired
    }).isRequired
};

export default withStyles(styles)(TestSuiteList);