import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer'; // ES6
import Counter from './Counter';
import SubComponent from './SubComponent';

const renderer = new ShallowRenderer();
renderer.render(<Counter />);
const result = renderer.getRenderOutput();

it('render properly root type', () => {
    expect(result.type).toBe('div');
});

const testRenderer = TestRenderer.create(<Counter />);
const testInstance = testRenderer.root;

it('render properly sub component', () => {
    expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
    expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);
});

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('can render and update a counter', () => {
    // Test first render and componentDidMount
    act(() => {
        ReactDOM.render(<Counter />, container);
    });
    const button = container.querySelector('button');
    const label = container.querySelector('p');
    expect(label.textContent).toBe('You clicked 0 times');
    expect(document.title).toBe('You clicked 0 times');

    // Test second render and componentDidUpdate
    act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(label.textContent).toBe('You clicked 1 times');
    expect(document.title).toBe('You clicked 1 times');

    // Test third render and componentDidUpdate
    act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(label.textContent).toBe('You clicked 2 times');
    expect(document.title).toBe('You clicked 2 times');

    // Test next 8 time clicked
    for(let i = 3; i <= 10; i++) {
        act(() => {
            button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });
        expect(label.textContent).toBe('You clicked ' + i + ' times');
        expect(document.title).toBe('You clicked ' + i + ' times');
    }
});

it('can render and update an option', () => {
    act(() => {
        ReactDOM.render(<Counter />, container);
    });
    const select = container.querySelector('select');
    const label = container.querySelector('#lable-selected');
    expect(label.textContent).toBe('You selected A');

    // Test select option B
    act(() => {
        select.value ="B"
        select.dispatchEvent(new MouseEvent('change', { bubbles: true }));
    });
    expect(label.textContent).toBe('You selected B');

    // Test select option C
    act(() => {
        select.value ="C"
        select.dispatchEvent(new MouseEvent('change', { bubbles: true }));
    });
    expect(label.textContent).toBe('You selected C');

    // Test select option D
    act(() => {
        select.value ="D"
        select.dispatchEvent(new MouseEvent('change', { bubbles: true }));
    });
    expect(label.textContent).toBe('You selected D');
});