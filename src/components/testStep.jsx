import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

class TestStep extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.step.name,
            value: props.step.value
        }
    }

    render() {
        return (
            <div>
                <TextField
                    label="Name"
                    value={this.state.name}
                    onChange={event => this.setState({ name: event.target.value })}
                />
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
    })
};

export default TestStep;