import React, { Component } from 'react';
import LoginControl from './LoginControl';
import Page from './Page';

class TestConditionalRendering extends Component {

    render() {
        return (
            <div>
                <LoginControl />
                <Mailbox unreadMessages={messages} />
                <Login isLoggedIn={false}/>
                <Page/>
            </div>
        );
    }
}

function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2>
            }
        </div>
    );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];

function Login(props) {
    const isLoggedIn = props.isLoggedIn;
    return (
        <div>
            The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
      </div>
    );
}

export default TestConditionalRendering