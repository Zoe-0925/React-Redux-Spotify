import React from 'react';
import renderer from 'react-test-renderer';
import SideMenu from "./SideMenu"

it('renders correctly', () => {
    const component = renderer.create(<SideMenu/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});