import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import { expenses } from '../fixtures';

let wrapper;

beforeEach(() => {
    wrapper =  shallow(<ExpenseListItem {...expenses[0]}/>);
});

test('should render ExpenseListItem with expenses', () => {
    expect(wrapper).toMatchSnapshot();
});