import React, { Component } from 'react';

class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    handleClickNoBind() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    handleClickNoBindWithArg(toggle) {
        let isToggleOn = false;
        if(toggle==="ON") {
            isToggleOn = true;
        }
        if(toggle==="OFF") {
            isToggleOn = false;
        }
        this.setState({
            isToggleOn: isToggleOn
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>
                    {this.state.isToggleOn ? 'ON' : 'OFF'}
                </button>
                <button onClick={(e) => this.handleClickNoBind(e)}>
                    {this.state.isToggleOn ? 'ON' : 'OFF'}
                </button>
                
                {/* Passing Arguments to Event Handlers */}
                <button onClick={(e) => this.handleClickNoBindWithArg("ON", e)}>Only ON</button>
                <button onClick={this.handleClickNoBindWithArg.bind(this, "OFF")}>Only OFF</button>
            </div>
        );
    }
}

export default Toggle