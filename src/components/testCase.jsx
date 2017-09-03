import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

import TestStep from './testStep';

class TestCase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.testCase.name
        }
    }

    render() {
        const stepElements = this.props.steps.map(s => <TestStep key={s.id} step={s} />);
        return (
            <div>
                <TextField
                    label="Name"
                    value={this.state.name}
                    onChange={event => this.setState({ name: event.target.value })}
                />
                {stepElements}
            </div>
        );
    }
}


TestCase.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
        name: PropTypes.string,
        action: PropTypes.number,
        locator: PropTypes.number
    })),
    testCase: PropTypes.shape({
        name: PropTypes.string,
        enabled: PropTypes.bool
    })
};

export default TestCase;