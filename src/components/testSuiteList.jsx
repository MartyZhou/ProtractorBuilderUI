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
import AddIcon from 'material-ui-icons/Add';
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
            if (data) {
                this.setState({
                    suites: data
                });
            }
        });
    }

    onSuiteClick = (event) => {
        let id = event.currentTarget.id;
        let suite = this.state.suites.find(s => s.id === id);
        this.props.onSuiteSelected(suite);
    };

    handleNewSuiteClick = () => {
        let suite = {
            id: '"' + this.state.suites.length + '"',
            name: 'New Suite',
            isNew: true
        };

        this.setState(prevState => ({
            suites: [...prevState.suites, suite]
        }));
    };

    render() {
        const suiteElements = this.state.suites.map(s =>
            <ListItem button key={s.id} id={s.id} onClick={this.onSuiteClick}>
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={s.name}
                />
            </ListItem>
        );

        return (
            <div>
                <List>
                    {suiteElements}
                    <IconButton aria-label="New Suite">
                        <AddIcon onClick={this.handleNewSuiteClick} />
                    </IconButton>
                </List>
            </div>
        );
    }
}

TestSuiteList.propTypes = {
    classes: PropTypes.object.isRequired,
    protractorService: PropTypes.shape({
        getSuites: PropTypes.func.isRequired
    }).isRequired,
    onSuiteSelected: PropTypes.func.isRequired
};

export default withStyles(styles)(TestSuiteList);