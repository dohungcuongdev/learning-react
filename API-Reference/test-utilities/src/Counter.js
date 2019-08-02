import React, { Component } from 'react';
import SubComponent from './SubComponent';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            count: 0,
            option: 'A'
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
    }
    componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
    }
    handleClick() {
        this.setState(state => ({
            count: state.count + 1,
        }));
    }
    handleChange(e) {
        this.setState({
            option: e.target.value
        });
    }
    render() {
        let optionState = this.state.option;
        return (
            <div>
                <SubComponent foo="bar" />
                <p>You clicked {this.state.count} times</p>
                <button onClick={this.handleClick}>
                    Click me
                </button>
                <p id="lable-selected">You selected {optionState}</p>
                <select onChange={this.handleChange} value={optionState}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>
            </div>
        );
    }
}

export default Counter