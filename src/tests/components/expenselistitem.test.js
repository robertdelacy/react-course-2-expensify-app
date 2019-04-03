import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseList'
import { expenses } from '../fixtures';

test('should render ExpenseListItem with expenses', () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});