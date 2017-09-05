import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';

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
            cases: [],
            expanded: false
        }
    };

    componentDidMount() {
        if (this.props.suite && this.props.suite.id) {
            this.props.protractorService.getSuite(this.props.suite.id).then(data => {
                this.setState({
                    cases: data.cases
                })
            });
        }
    };

    render() {
        const classes = this.props.classes;
        const caseElements = this.props.cases.map(s => <TestCase
            key={s.id}
            testCase={s}
            protractorService={this.props.protractorService} />);
        return (
            <div>
                <Typography type="title" className={classes.title}>
                    {this.props.suite.name}
                </Typography>
                <List>
                    {caseElements}
                </List>
            </div>
        );
    }
}

TestSuite.propTypes = {
    classes: PropTypes.object.isRequired,
    protractorService: PropTypes.shape({
        getSuite: PropTypes.func.isRequired
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