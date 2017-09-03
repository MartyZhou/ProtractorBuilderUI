import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

import TestCase from './testCase';

class TestSuite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name
        }
    }

    render() {
        const caseElements = this.props.cases.map(s => <TestCase key={s.id} testCase={s} />);
        return (
            <div>
                <TextField
                    label="Name"
                    value={this.state.name}
                    onChange={event => this.setState({ name: event.target.value })}
                />
                {caseElements}
            </div>
        );
    }
}

TestSuite.propTypes = {
    cases: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        enabled: PropTypes.bool
    })),
    suite: PropTypes.shape({
        name: PropTypes.string,
        enabled: PropTypes.bool
    })
};

export default TestSuite;