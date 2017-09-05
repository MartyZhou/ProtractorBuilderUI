import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import TextField from 'material-ui/TextField';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

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
            //name: props.suite.name,
            cases: [],
            expanded: false
        }
    }

    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
        this.props.protractorService.getSuite(this.props.suite.id).then(data=>{
            this.setState({
                cases: data.cases
            })
        });
    };

    render() {
        const classes = this.props.classes;
        const caseElements = this.state.cases.map(s => <TestCase key={s.id} testCase={s} />);
        return (
            <div>
                <Card >
                    <CardHeader title={this.state.name} />
                    <CardContent>
                        <TextField
                            label="Name"
                            value={this.state.name}
                            onChange={event => this.setState({ name: event.target.value })}
                        />
                    </CardContent>
                    <CardActions disableActionSpacing>
                        <IconButton
                            className={classnames(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="Show Cases"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
                        <CardContent>
                            {caseElements}
                        </CardContent>
                    </Collapse>
                </Card>
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