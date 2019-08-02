import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SubComponent from './SubComponent';

const renderer = new ShallowRenderer();
renderer.render(<SubComponent />);
const result = renderer.getRenderOutput();

it('render properly root type', () => {
    expect(result.type).toBe('h5');
    expect(result.props.children).toEqual("Sub");
});