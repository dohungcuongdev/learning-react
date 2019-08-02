import React, { Component } from 'react';
import NameForm from './NameForm';
import EssayForm from './EssayForm';
import FlavorForm from './FlavorForm';
import Reservation from './Reservation';

class TestHandleForms extends Component {
    render() {
        return (
            <div>
                <NameForm />
                <EssayForm />
                <FlavorForm />
                <Reservation />
                {/* Specifying the value prop on a controlled component prevents the user from changing the input unless you desire so. If you’ve specified a value but the input is still editable, you may have accidentally set value to undefined or null.
                    The following code demonstrates this. (The first input is locked but the second one is editable.) */}
                <input value="hi" />
                <input value={null} />
            </div>
        );
    }
}

export default TestHandleForms