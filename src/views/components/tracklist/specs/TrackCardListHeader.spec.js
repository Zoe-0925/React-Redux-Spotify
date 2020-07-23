import React from 'react';
//import renderer from 'react-test-renderer';
import TrackCardListHeader from "../TrackCardListHeader"
import { shallow } from 'enzyme';



const title = "mock title"
const onClick = jest.fn()


//const component = renderer.create(<TrackCardListHeader title={title} onClick={onClick} />);
const wrapper = shallow((<TrackCardListHeader title={title} onClick={onClick} />))

//it('renders correctly', () => {
//    expect(component.toJSON()).toMatchSnapshot();
//});

it('should dispatch an action on button click', () => {
    wrapper.find('.title').simulate('click');
    expect(onClick).toBeCalled();
});