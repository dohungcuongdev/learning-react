import React, { Component } from 'react';
import SignUpDialog from './SignUpDialog';

function Contacts() {
    return <div className="Contacts">Contact</div>;
}

function Chat() {
    return <div className="Chat">Chat</div>;
}

function Hello() {
    return <div className="Hello">Hello</div>;
}

function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.top}
            </div>
            <div className="SplitPane-middle">
                {props.middle}
            </div>
            <div className="SplitPane-right">
                {props.bottom}
            </div>
        </div>
    );
}

function Test() {
    return (
        <SplitPane
            top={
                <Contacts />
            }
            middle={
                <Hello/>
            }
            bottom={
                <Chat />
            } />
    );
}

function FancyBorder(props) {
    return (
      <div className={'FancyBorder FancyBorder-' + props.color}>
        {props.children}
      </div>
    );
  }

function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
        </FancyBorder>
    );
}

function WelcomeDialog() {
    return (
        <Dialog
            title="Welcome"
            message="Thank you for visiting our spacecraft!" />

    );
}

class TestComposition extends Component {

    render() {
        return (
            <div>
                <Test />
                <WelcomeDialog />
                <SignUpDialog />
            </div>
        );
    }
}

export default TestComposition